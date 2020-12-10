export declare const config: {
    port: number;
    db: {
        reconnectConfig: {
            maxReconnects: number;
            reconnectTimeout: number;
        };
        mssqlConfig: {
            user: string;
            password: string | undefined;
            server: string;
            database: string;
            requestTimeout: number;
            port: number;
            pool: {
                max: number;
                min: number;
                idleTimeoutMillis: number;
            };
            options: {
                encrypt: boolean;
                enableArithAbort: boolean;
            };
        };
    };
};
//# sourceMappingURL=config.d.ts.map