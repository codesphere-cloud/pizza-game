import express from 'express';
import {createAndConnectMSSQLDatabase} from "./stubs/MSSQLDatabase";
import {config} from './config';
import {GiftCodeDao, OUT_OF_GIFT_CODES_STATUS} from "./GiftCodeDao";
import {equal} from './helpers/equal';

(async () => {
    const db = await createAndConnectMSSQLDatabase(config.db.reconnectConfig, config.db.mssqlConfig, true);
    const giftCodeDao = new GiftCodeDao(db);
    const app = express();
    const blacklist: string[] = [];

    app.get('/gift-code', async (request, response) => {
        const ip: string = request.headers['x-forwarded-for']! as string || request.connection.remoteAddress!;

        console.log(ip);

        /*
        if (blacklist.includes(ip)) {
            response.send("You already won your gift code.");
            return;
        }
         */

        const giftCode = await giftCodeDao.claimNextCode();

        if (giftCode.notOk()) {
            response.status(500);
            return;
        }

        if (!equal(giftCode, OUT_OF_GIFT_CODES_STATUS)) {
            blacklist.push(ip);
        }


        response.send(giftCode.getValue());
    });

    app.listen(config.port);
    console.log(`Pizza Game backend listening on port ${config.port}`);
})();