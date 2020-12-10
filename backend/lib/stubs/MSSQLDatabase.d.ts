import { config as MssqlConfig, ConnectionPool, Table } from "mssql";
import { QueryResult, SqlDatabase, SqlInputParameter, SqlQuery } from "./SqlDatabase";
import { ReconnectingClient, ReconnectConfig } from "./ReconnectingClient";
import { Reply, Status } from "../helpers/Reply";
export declare class MSSQLDatabase extends ReconnectingClient implements SqlDatabase<'mssql'> {
    protected connectionPool: ConnectionPool;
    private readonly mssqlConfig;
    private readonly logErrors;
    constructor(onReconnectsExceeded: (status: Reply<never, Status.Error> | null) => void, reconnectConfig: ReconnectConfig, mssqlConfig: MssqlConfig, logErrors?: boolean);
    call<T extends QueryResult>(query: SqlQuery<'mssql', T> | SqlQuery<'standardSQL', T>): Promise<Reply<T>>;
    bulk<T extends QueryResult>(table: Table): Promise<Reply>;
    disconnect(): Promise<void>;
    protected connectToExternalService(): Promise<Reply>;
}
export declare function getType(param: SqlInputParameter): any;
export declare function createAndConnectMSSQLDatabase(reconnectConfig: ReconnectConfig, mssqlConfig: MssqlConfig, logErrors?: boolean): Promise<MSSQLDatabase>;
//# sourceMappingURL=MSSQLDatabase.d.ts.map