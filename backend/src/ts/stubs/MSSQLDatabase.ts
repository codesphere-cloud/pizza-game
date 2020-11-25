import {config as MssqlConfig, ConnectionPool, Request, Table, TYPES} from "mssql";
import {QueryResult, SqlDatabase, SqlInputParameter, SqlQuery} from "./SqlDatabase";
import {ReconnectingClient, ReconnectConfig} from "./ReconnectingClient";
import {Reply, errStatus, okReply, getOk, Status} from "../helpers/Reply";
import { has } from "../helpers/has";
import { isEmpty } from "../helpers/isEmpty";

/**
 * MSSQL Database wrapper for an external SQL database.
 * The query execution is directly delegated to the database driver.
 */
export class MSSQLDatabase extends ReconnectingClient implements SqlDatabase<'mssql'> {

    /**
     * MSSQL 'connection pool' which holds the database connection(s).
     * (Internally, each ConnectionPool instance is a separate pool of database
     * connections.
     * Once you fetchDataAndLoadToChart a new query, a new connection is
     * acquired from the pool and reserved for desired action. Once the action
     * is complete, the connection is released back to the pool. Connection
     * health check is built-in so once the dead connection is discovered, it
     * is immediately replaced with a new one.)
     */
    protected connectionPool!: ConnectionPool;

    private readonly mssqlConfig: MssqlConfig;
    private readonly logErrors: boolean;

    /**
     * Creates a new MSSQLDatabase (which is a facade for an external
     * mssql database) from a mssql (see: https://www.npmjs.com/package/mssql)
     * config and connects to the database.
     * @param {function} onReconnectsExceeded callback which will be
     * invoked after the number of reconnection attempts to the external service
     * was exceeded
     * @param {ReconnectConfig} reconnectConfig specify the templateName of the
     * external service (here mssql database) how often to reconnect and,
     * after which timeout the reconnection should be attempted when the
     * connection to the external service was lost
     * @param {mssqlConfig} mssqlConfig mssql connection configuration
     * (e.g. encryption, user, password...)
     */
    public constructor(onReconnectsExceeded: (status: Reply<never, Status.Error> | null) => void,
                       reconnectConfig: ReconnectConfig,
                       mssqlConfig: MssqlConfig,
                       logErrors: boolean = true) {
        super(onReconnectsExceeded, reconnectConfig);
        this.mssqlConfig = mssqlConfig;
        this.logErrors = logErrors;
    }

    /**
     * Query data from the database.
     * @param {SqlQuery} query containing the sql query string and a list of input
     * parameters.
     * @returns The query result or an error.
     */
    public async call<T extends QueryResult>(query: SqlQuery<'mssql', T> | SqlQuery<'standardSQL', T>):
        Promise<Reply<T>> {

        if (!has(query)) {
            return errStatus('Query not defined.');
        }
        await this.resolveWhenConnected();

        const sql = (query as SqlQuery<'mssql'>).sql.mssql ?? (query as SqlQuery<'standardSQL'>).sql.standardSQL;
        if (!has(sql)) {
            return errStatus("Query does not contain SQL in the microsoft or ansi dialect: " +
                JSON.stringify(query));
        }

        try {
            const request: Request = await this.connectionPool.request();
            for (const parameter of query.parameters) {
                request.input(parameter.name,
                    getType(parameter),
                    parameter.value);
            }

            let result;
            if (sql.length < 2000) {
                result = await request.query(sql);
            } else {
                // special case in mssql driver: queries longer 4000 chars will break if not executed like below.
                // used 2000 as the boundary, as the values also count to the query size (armin)
                result = await request.batch(sql);
            }
            if (has(result) &&
                has(result.recordset) &&
                result.recordset.length !== 0) {
                return okReply(result.recordset as unknown as T);
            } else {
                return okReply([] as T);
            }
        } catch (err) {
            if (has(query.ignoreMissingTables) &&
                query.ignoreMissingTables &&
                !isEmpty(err.message.match(/Invalid object name '[a-zA-Z0-9_\-]*'\./i))) {

                return okReply([] as T);
            }
            const errResult = errStatus(err.message);
            if (this.logErrors) {
                console.log(`ERROR MSSQLDatabase SQL ${sql} params ${JSON.stringify(query.parameters)}`);
                errResult.log();
            }
            return errResult;
        }
    }

    public async bulk<T extends QueryResult>(table: Table): Promise<Reply> {
        if (!has(table)) {
            return errStatus('Bulk table not defined.');
        }
        if (isEmpty(table.rows)) {
            return Reply.getOk();
        }
        await this.resolveWhenConnected();
        try {
            const request: Request = await this.connectionPool.request();
            const bulkResult = await request.bulk(table);
            return getOk();
        } catch (err) {
            const errResult = Reply.createFromError(err);
            if (this.logErrors) {
                errResult.log();
            }
            return errResult;
        }
    }

    public async disconnect(): Promise<void> {
        return this.connectionPool.close();
    }

    /**
     * Connects to a MSSQL Database.
     * @returns StatusCode.OK if the connection was established successfully.
     */
    protected connectToExternalService(): Promise<Reply> {
        return new Promise<Reply>(async resolve => {
            this.connectionPool = new ConnectionPool(this.mssqlConfig);
            this.connectionPool.on("error", (err: any) => {
                resolve(errStatus(err));
                this.onDisconnect(errStatus(err));
            });
            try {
                await this.connectionPool.connect();
                resolve(Reply.getOk());
            } catch (err) {
                resolve(errStatus(err));
            }
        });
    }
}

/**
 * Returns the MSSQL Type of a provided SqlInputParameter.
 * @param {SqlInputParameter} param MSSQL input parameter
 * @returns {any} the mssql type of the input parameter
 */
export function getType(param: SqlInputParameter): any {
    return TYPES[param.type];
}

export async function createAndConnectMSSQLDatabase(reconnectConfig: ReconnectConfig,
                                                    mssqlConfig: MssqlConfig,
                                                    logErrors?: boolean): Promise<MSSQLDatabase> {
    const db: MSSQLDatabase = new MSSQLDatabase(status => {
        has(status) ?
            status.log() :
            Reply.errStatus('Connecting to the database failed because of an unknown reason.').log();
    }, reconnectConfig, mssqlConfig, logErrors);
    await db.connect();
    return db;
}