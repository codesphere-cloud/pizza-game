"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const timeSpan_1 = require("./helpers/timeSpan");
const timeConstants_1 = require("./helpers/timeConstants");
exports.config = {
    port: 3001,
    db: {
        reconnectConfig: {
            maxReconnects: 10,
            reconnectTimeout: 5 * timeSpan_1.milliSecondsInAMinute
        },
        mssqlConfig: {
            user: "ideservice_rw",
            password: process.env.MSSQL_PW,
            server: "codesphere-dev.database.windows.net",
            database: "masterdata",
            requestTimeout: timeConstants_1.MILLSECONDS_IN_A_MINUTE,
            port: 1433,
            pool: {
                max: 2,
                min: 1,
                idleTimeoutMillis: timeConstants_1.MILLSECONDS_IN_A_MINUTE,
            },
            options: {
                encrypt: true,
                enableArithAbort: true,
            },
        }
    }
};
//# sourceMappingURL=config.js.map