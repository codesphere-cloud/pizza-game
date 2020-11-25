import express from 'express';
import {createAndConnectMSSQLDatabase} from "./stubs/MSSQLDatabase";
import {config} from './config';
import {SqlQuery} from './stubs/SqlDatabase';
import {isEmpty} from "./helpers/isEmpty";

const db = createAndConnectMSSQLDatabase(config.db.reconnectConfig, config.db.mssqlConfig);

const app = express();
app.get('/gift-code', async (request, response) => {
    const dbResponse = await (await db).call({
        sql: {
            mssql: "SELECT TOP 1 code FROM gift-code WHERE used = 0"
        },
        parameters: []
    } as SqlQuery<'mssql', { code: string }[]>);
    if(dbResponse.notOk()) {
        response.status(500);
        return;
    }

    if(isEmpty(dbResponse.getValue())) {
        response.send("Sorry, we ran out of gift codes.");
    } else {
        const giftCode = dbResponse.getValue()[0].code;
        response.send(giftCode);
        await (await db).call({
            sql: {
                mssql: `UPDATE gift-code SET used = 0 WHERE code = '${giftCode}'`
            },
            parameters: []
        });
    }
});
app.listen(config.port);

console.log(`Pizza Game backend listening on port ${config.port}`);

