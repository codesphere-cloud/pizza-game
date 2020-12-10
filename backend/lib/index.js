"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MSSQLDatabase_1 = require("./stubs/MSSQLDatabase");
const config_1 = require("./config");
const GiftCodeDao_1 = require("./GiftCodeDao");
const equal_1 = require("./helpers/equal");
(async () => {
    const db = await MSSQLDatabase_1.createAndConnectMSSQLDatabase(config_1.config.db.reconnectConfig, config_1.config.db.mssqlConfig, true);
    const giftCodeDao = new GiftCodeDao_1.GiftCodeDao(db);
    const app = express_1.default();
    const blacklist = [];
    app.get('/gift-code', async (request, response) => {
        const ip = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
        console.log(ip);
        const giftCode = await giftCodeDao.claimNextCode();
        if (giftCode.notOk()) {
            response.status(500);
            return;
        }
        if (!equal_1.equal(giftCode, GiftCodeDao_1.OUT_OF_GIFT_CODES_STATUS)) {
            blacklist.push(ip);
        }
        response.send(giftCode.getValue());
    });
    app.listen(config_1.config.port);
    console.log(`Pizza Game backend listening on port ${config_1.config.port}`);
})();
//# sourceMappingURL=index.js.map