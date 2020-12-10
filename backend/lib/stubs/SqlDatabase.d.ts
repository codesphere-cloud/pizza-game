import { SqlType } from "./SqlType";
import { MSSQLDatabase } from "./MSSQLDatabase";
import { config as MssqlConfig } from "mssql";
import { Reply } from "../helpers/Reply";
import { ReconnectConfig } from "./ReconnectingClient";
export declare enum PriorityType {
    SystemUnimportant = 0,
    Batch = 1,
    Online = 2,
    SystemImportant = 4
}
export interface SqlInputParameter {
    name: string;
    type: SqlType;
    value: any;
}
export declare type QueryResult = (Record<string, unknown> | number | string)[] | [];
export declare type EmptyQueryResult = [];
export declare type SqlQuery<DialectT extends SqlDialect = never, T extends QueryResult = QueryResult> = {
    readonly sql: VendorSpecificSQL<DialectT>;
    readonly parameters: SqlInputParameter[];
    readonly ignoreMissingTables?: boolean;
};
export declare type SqlDialect = 'standardSQL' | 'mariaDB' | 'mssql' | 'postgresql';
export declare type VendorSpecificSQL<DialectT extends SqlDialect = never> = {
    [P in DialectT]: string;
};
export declare type PrioritizedSqlQuery<DialectT extends SqlDialect = never, T extends QueryResult = QueryResult> = SqlQuery<DialectT, T> & {
    priority: PriorityType;
    requestId?: string;
    cancelWholeRequestIfFailed?: boolean;
};
export interface SqlDatabase<DialectT extends SqlDialect = SqlDialect> {
    call<T extends QueryResult>(query: SqlQuery<DialectT, T> | SqlQuery<'standardSQL', T>): Promise<Reply<T>>;
}
export declare const createAndConnectDatabase: (config: {
    provider: 'mssql';
    reconnectConfig: ReconnectConfig;
    storageConfig: MssqlConfig;
    logErrors?: boolean;
}) => Promise<Reply<MSSQLDatabase>>;
//# sourceMappingURL=SqlDatabase.d.ts.map