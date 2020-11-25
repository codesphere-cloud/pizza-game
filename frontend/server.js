const express = require("express");
const {createProxyMiddleware} = require('http-proxy-middleware');

const options = {
    target: 'http://localhost:8080',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
        '^/backend': '/',
    },
    router: {
        '/backend': 'http://localhost:3000',
    },
};
const proxy = createProxyMiddleware(options);

const app = express();

app.use(express.static(__dirname + '/lib'));
app.use('/backend', proxy);
app.listen(80);

console.log("Pizza game frontend listening on port 80");