"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAndConnectMSSQLDatabase = exports.getType = exports.MSSQLDatabase = void 0;
const mssql_1 = require("mssql");
const ReconnectingClient_1 = require("./ReconnectingClient");
const Reply_1 = require("../helpers/Reply");
const has_1 = require("../helpers/has");
const isEmpty_1 = require("../helpers/isEmpty");
class MSSQLDatabase extends ReconnectingClient_1.ReconnectingClient {
    constructor(onReconnectsExceeded, reconnectConfig, mssqlConfig, logErrors = true) {
        super(onReconnectsExceeded, reconnectConfig);
        this.mssqlConfig = mssqlConfig;
        this.logErrors = logErrors;
    }
    async call(query) {
        var _a;
        if (!has_1.has(query)) {
            return Reply_1.errStatus('Query not defined.');
        }
        await this.resolveWhenConnected();
        const sql = (_a = query.sql.mssql) !== null && _a !== void 0 ? _a : query.sql.standardSQL;
        if (!has_1.has(sql)) {
            return Reply_1.errStatus("Query does not contain SQL in the microsoft or ansi dialect: " +
                JSON.stringify(query));
        }
        try {
            const request = await this.connectionPool.request();
            for (const parameter of query.parameters) {
                request.input(parameter.name, getType(parameter), parameter.value);
            }
            let result;
            if (sql.length < 2000) {
                result = await request.query(sql);
            }
            else {
                result = await request.batch(sql);
            }
            if (has_1.has(result) &&
                has_1.has(result.recordset) &&
                result.recordset.length !== 0) {
                return Reply_1.okReply(result.recordset);
            }
            else {
                return Reply_1.okReply([]);
            }
        }
        catch (err) {
            if (has_1.has(query.ignoreMissingTables) &&
                query.ignoreMissingTables &&
                !isEmpty_1.isEmpty(err.message.match(/Invalid object name '[a-zA-Z0-9_\-]*'\./i))) {
                return Reply_1.okReply([]);
            }
            const errResult = Reply_1.errStatus(err.message);
            if (this.logErrors) {
                console.log(`ERROR MSSQLDatabase SQL ${sql} params ${JSON.stringify(query.parameters)}`);
                errResult.log();
            }
            return errResult;
        }
    }
    async bulk(table) {
        if (!has_1.has(table)) {
            return Reply_1.errStatus('Bulk table not defined.');
        }
        if (isEmpty_1.isEmpty(table.rows)) {
            return Reply_1.Reply.getOk();
        }
        await this.resolveWhenConnected();
        try {
            const request = await this.connectionPool.request();
            const bulkResult = await request.bulk(table);
            return Reply_1.getOk();
        }
        catch (err) {
            const errResult = Reply_1.Reply.createFromError(err);
            if (this.logErrors) {
                errResult.log();
            }
            return errResult;
        }
    }
    async disconnect() {
        return this.connectionPool.close();
    }
    connectToExternalService() {
        return new Promise(async (resolve) => {
            this.connectionPool = new mssql_1.ConnectionPool(this.mssqlConfig);
            this.connectionPool.on("error", (err) => {
                resolve(Reply_1.errStatus(err));
                this.onDisconnect(Reply_1.errStatus(err));
            });
            try {
                await this.connectionPool.connect();
                resolve(Reply_1.Reply.getOk());
            }
            catch (err) {
                resolve(Reply_1.errStatus(err));
            }
        });
    }
}
exports.MSSQLDatabase = MSSQLDatabase;
function getType(param) {
    return mssql_1.TYPES[param.type];
}
exports.getType = getType;
async function createAndConnectMSSQLDatabase(reconnectConfig, mssqlConfig, logErrors) {
    const db = new MSSQLDatabase(status => {
        has_1.has(status) ?
            status.log() :
            Reply_1.Reply.errStatus('Connecting to the database failed because of an unknown reason.').log();
    }, reconnectConfig, mssqlConfig, logErrors);
    (await db.connect()).logIfError();
    return db;
}
exports.createAndConnectMSSQLDatabase = createAndConnectMSSQLDatabase;
//# sourceMappingURL=MSSQLDatabase.js.map