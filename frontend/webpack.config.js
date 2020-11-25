const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let version = new Date().toString();
try {
    version = fs.readFileSync(path.join(__dirname, '../../../VERSION'), 'utf-8');
    version = version.trim();
} catch (error) {
    // do not log this error, it occurs in the local build because the file does not exist
    // console.log(error)
}
console.log(`use version ${version}`);

// env is passed when calling webpack with the the parameter --env=<value>
module.exports = (env) => {
    // we have two possible environments: (local and devserver) or production
    const production = env === 'production';
    // output sourcemaps and put all .js in one line?
    const mode = production ? 'production' : 'development';
    // minimize the javascript with terser?
    const minimize = production;
    // include sourcemaps inline or external - external means we delete them before adding to docker
    // we always need a sourcemap for the .css/.scss loader to work, anyway - see below
    // const devtool = production ? 'source-map' : 'cheap-module-eval-source-map';
    const devtool = 'source-map';
    // shall we read sourcemaps from the compiled .ts sources?
    const sourcemaploaderTest = production ? /donotloadjssourcemaps$/ : /\.js$/; // even faster inline sourcemaps, dev-only

    return {
        watchOptions: {
            ignored: ['node_modules/**']
        },
        entry: {
            main: __dirname + '/src/ts/index.ts',
        },
        mode,
        devtool,
        output: {
            filename: 'cacheme-main-[contenthash].js',
            chunkFilename: 'cacheme-[contenthash].js',
            path: path.resolve(__dirname, "./lib"),
            devtoolModuleFilenameTemplate: "webpack:///[absolute-resource-path]",
        },
        optimization: {
            splitChunks: {
                chunks: 'async',
                minSize: 10000,
                maxSize: 600000,
                minChunks: 1,
                maxAsyncRequests: 6,
                maxInitialRequests: 4,
                automaticNameDelimiter: '_',
                cacheGroups: {
                    frame: {
                        test: /[\\/]@fast-web/,
                        priority: -10,
                        reuseExistingChunk: true,

                    },
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true,
                    },
                    main: {
                        minChunks: 1,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            },
            minimize,
            minimizer: [new (require('terser-webpack-plugin'))({
                parallel: true,
            })],
        },
        module: {
            rules: [
                {
                    test: /\.(s[ac]ss|css)$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        'style-loader',
                        // Translates CSS into CommonJS
                        'css-loader',
                        // resolve relative font-urls
                        {
                            loader: 'resolve-url-loader', // required for some relative resource links in .css/.scss files in modules
                            options: {
                                sourceMap: !production,
                            },
                        },
                        // Compiles Sass to CSS
                        {
                            loader: 'sass-loader',
                            options: {
                                // sourceMap: !production
                            },
                        },
                    ],
                },
                {
                    test: /\.(svg|png|jpg|gif)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[hash]-[name].[ext]',
                        outputPath: 'assets/images'
                    },
                },
                {
                    test: sourcemaploaderTest,
                    use: ["source-map-loader"], // load existing source maps from tsc-compile
                    enforce: "pre",
                },
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true, // for speed, we do not type-check here. type checking is done in the tsc run
                        },
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.(woff(2)?|ttf|eot)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'assets/fonts/',
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(version),
            }),
            new webpack.ProvidePlugin({
                // this replaces all references to $, window.jQuery to use jquery - necessary for deduplication
                "$": "jquery",
                "jQuery": "jquery",
                "window.jQuery": "jquery",
                // replaces jquery-ui/data with jquery-ui/ui/data - older versions of jquery-ui didn't have the /ui/ folder in the package
                "jquery-ui/data": "jquery-ui/ui/data",
            }),
            // this takes the src/html/index.html file and puts the script and style tags into it
            new HtmlWebpackPlugin({
                title: 'Hello',
                template: 'src/html/index.html',
                filename: 'index.html',
            }),
            // this avoids packing _all_ locales from momentjs into our distribution and only allows en and de. saves 200kb
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|en/),
        ],
        resolve: {
            // when a require without filename extension takes place, this is the files extensions that we search for
            extensions: ['.tsx', '.ts', '.js'],
        },
        // without this, the ejs package fails because it uses node-package fs, which is not
        // available in the browser
        node: {
            fs: "empty",
        },
    };
};