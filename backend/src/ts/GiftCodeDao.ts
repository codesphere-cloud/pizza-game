import {SqlDatabase, SqlQuery} from "./stubs/SqlDatabase";
import {isEmpty} from "./helpers/isEmpty";
import { Reply } from "./helpers/Reply";

export class GiftCodeDao {
    private readonly db;
    public constructor(db: SqlDatabase<'mssql'>) {
        this.db = db;
    }

    public async claimNextCode(): Promise<Reply<string>> {
        const dbResponse = await this.db.call({
            sql: {
                mssql: "SELECT TOP 1 code FROM gift_code WHERE used = 0"
            },
            parameters: []
        } as SqlQuery<'mssql', { code: string }[]>);
        if(dbResponse.notOk()) {
            return Reply.errStatus("Internal server error.");
        }

        if(isEmpty(dbResponse.getValue())) {
            return Reply.okStatus("Sorry, we ran out of gift codes.");
        }

        const giftCode = dbResponse.getValue().pop()!.code;
        await this.db.call({
            sql: {
                mssql: `UPDATE gift_code SET used = 1 WHERE code = '${giftCode}'`
            },
            parameters: []
        });

        return Reply.okStatus(giftCode);
    }
}