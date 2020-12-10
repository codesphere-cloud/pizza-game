import { SqlDatabase } from "./stubs/SqlDatabase";
import { Reply } from "./helpers/Reply";
export declare const OUT_OF_GIFT_CODES_STATUS: Reply<string, import("./helpers/Reply").Status.Ok>;
export declare class GiftCodeDao {
    private readonly db;
    constructor(db: SqlDatabase<'mssql'>);
    claimNextCode(): Promise<Reply<string>>;
}
//# sourceMappingURL=GiftCodeDao.d.ts.map