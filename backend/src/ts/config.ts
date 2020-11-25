import {milliSecondsInAMinute} from "./helpers/timeSpan";
import {MILLSECONDS_IN_A_MINUTE} from "./helpers/timeConstants";

export const config = {
    port: 3001,
    db: {
        reconnectConfig: {
            maxReconnects: 10,
            reconnectTimeout: 5 * milliSecondsInAMinute
        },
        mssqlConfig: {
            user: "ideservice_rw",
            password: process.env.MSSQL_PW,
            server: "codesphere-dev.database.windows.net",
            database: "masterdata",
            requestTimeout: MILLSECONDS_IN_A_MINUTE,
            port: 1433,
            pool: {
                max: 2,
                min: 1,
                idleTimeoutMillis: MILLSECONDS_IN_A_MINUTE,
            },
            options: {
                encrypt: true,
                enableArithAbort: true,
            },
        }

    }

}