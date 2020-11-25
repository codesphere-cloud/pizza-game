import {SqlType} from "./SqlType";
import {createAndConnectMSSQLDatabase, MSSQLDatabase} from "./MSSQLDatabase";
import {config as MssqlConfig} from "mssql";
import {okReply, Reply} from "../helpers/Reply";
import {ReconnectConfig} from "./ReconnectingClient";

export enum PriorityType {
    /**
     * A system job like nightly cleanup of the DB, computing last weeks bills etc.
     * Nobody is really waiting for it to happen now.
     */
    SystemUnimportant = 0,

    /**
     * A user batch process like export. User waits for the result, but knows it will take some time
     */
    Batch = 1,

    /**
     * An online user request for the UI. User wants to see the results now.
     */
    Online = 2,

    /**
     * A high priority request from the system,
     * like cleaning dead processes, killing a query, etc.
     * must be run before any other queries
     */
    SystemImportant = 4,
}

/**
 * Sql input parameter interface.
 * Input parameters are used to prevent
 * SQL Injection and to pre-compile common sql queries.
 * Use the pattern @parameter in the sql string to use an input parameter.
 * Note that you should always use input parameters over variable substitution
 * in the sql string!
 */
export interface SqlInputParameter {
    name: string;
    type: SqlType;
    value: any;
}

export type QueryResult = (Record<string, unknown> | number | string)[] | [];

/**
 * The {@link QueryResult} for {@link SqlQuery} that do not return the output of a select statement.
 */
export type EmptyQueryResult = [];

/**
 * Sql query interface containing the sql query string and a
 * list of input parameters which will be attached to the query on execution.
 *
 * @param DialectT The type of sql dialects that are contained in this query.
 * @param T The type of result that this query will be produced when this query is executed by an {@link SqlDatabase}.
 *     The default value {@code never} implies that this query contains no sql dialect at all.
 */
export type SqlQuery<DialectT extends SqlDialect = never, T extends QueryResult = QueryResult> = {
    readonly sql: VendorSpecificSQL<DialectT>;
    /**
     * Array of sql input parameters which will be substituted in this query.
     */
    readonly parameters: SqlInputParameter[];
    /**
     * If set to {@code true}, queries that throw an exception because a table is not existing will return an
     * {@link EmptyQueryResult} instead of returning an error status when executed on an {@link SqlDatabase}.
     */
    readonly ignoreMissingTables?: boolean;
}

export type SqlDialect = 'standardSQL' | 'mariaDB' | 'mssql' | 'postgresql';

/**
 * @param DialectT The default value {@code never} implies that there is no vendor specific sql contained in this
 *     object at all.
 * @param T The type of result that this query will be produced when this query is executed by an {@link Database}.
 *     The default value {@code never} implies that this query contains no sql dialect at all.
 */
export type VendorSpecificSQL<DialectT extends SqlDialect = never> = {
    /**
     * A string that contains SQL in a specific dialect.
     */
    [P in DialectT]: string;
};

/**
 * Like {@link Query} but with additional metadata.
 *
 * @param T The type of result that this query will produce when executed by an {@link Database}.
 */
export type PrioritizedSqlQuery<DialectT extends SqlDialect = never, T extends QueryResult = QueryResult>
    = SqlQuery<DialectT, T> & {
    /**
     * The priority of this query. A higher number implies higher priority.
     */
    priority: PriorityType;

    /**
     * Allows the {@link PrioritizedSqlQuery} to be associated with a request.
     *
     * A request may be associated with many {@link PrioritizedSqlQuery} .
     * In that case, instances with equal requestId will be interpreted as being
     * splits of a
     * bigger query as created by e.g. {@link TimeIntervalSqlService}.
     * With this we can:
     * - cancel all queries if one of the query with the same request id failed
     * - cancel all queries with the same request id if the originating request has been stopped
     */
    requestId?: string;

    /**
     * Shall we cancel all queries of the same request if this query fails?
     * Default is true
     */
    cancelWholeRequestIfFailed?: boolean;
};

/**
 * A sql database is a service with well-defined input and output parameters.
 *
 * @param DialectT The type of sql dialect that this database needs. {@link VendorSpecificSQL.standardSQL} is assumed
 *     to always be understood.
 */
export interface SqlDatabase<DialectT extends SqlDialect = SqlDialect> {
    call<T extends QueryResult>(query: SqlQuery<DialectT, T> | SqlQuery<'standardSQL', T>): Promise<Reply<T>>;
}


export const createAndConnectDatabase = async (config: {
    provider: 'mssql';
    reconnectConfig: ReconnectConfig;
    storageConfig: MssqlConfig;
    logErrors?: boolean;
}): Promise<Reply<MSSQLDatabase>> => {
    return okReply(
        await createAndConnectMSSQLDatabase(
            config.reconnectConfig,
            config.storageConfig as MssqlConfig,
            config.logErrors,
        ));
}
