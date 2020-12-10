"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GiftCodeDao = exports.OUT_OF_GIFT_CODES_STATUS = void 0;
const isEmpty_1 = require("./helpers/isEmpty");
const Reply_1 = require("./helpers/Reply");
exports.OUT_OF_GIFT_CODES_STATUS = Reply_1.Reply.okStatus("Sorry, we ran out of gift codes.");
class GiftCodeDao {
    constructor(db) {
        this.db = db;
    }
    async claimNextCode() {
        const dbResponse = await this.db.call({
            sql: {
                mssql: "SELECT TOP 1 code FROM gift_code WHERE used = 0"
            },
            parameters: []
        });
        if (dbResponse.notOk()) {
            return Reply_1.Reply.errStatus("Internal server error.");
        }
        if (isEmpty_1.isEmpty(dbResponse.getValue())) {
            return exports.OUT_OF_GIFT_CODES_STATUS;
        }
        const giftCode = dbResponse.getValue().pop().code;
        await this.db.call({
            sql: {
                mssql: `UPDATE gift_code SET used = 1 WHERE code = '${giftCode}'`
            },
            parameters: []
        });
        return Reply_1.Reply.okStatus(giftCode);
    }
}
exports.GiftCodeDao = GiftCodeDao;
//# sourceMappingURL=GiftCodeDao.js.map