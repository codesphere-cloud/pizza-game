"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAndConnectDatabase = exports.PriorityType = void 0;
const MSSQLDatabase_1 = require("./MSSQLDatabase");
const Reply_1 = require("../helpers/Reply");
var PriorityType;
(function (PriorityType) {
    PriorityType[PriorityType["SystemUnimportant"] = 0] = "SystemUnimportant";
    PriorityType[PriorityType["Batch"] = 1] = "Batch";
    PriorityType[PriorityType["Online"] = 2] = "Online";
    PriorityType[PriorityType["SystemImportant"] = 4] = "SystemImportant";
})(PriorityType = exports.PriorityType || (exports.PriorityType = {}));
const createAndConnectDatabase = async (config) => {
    return Reply_1.okReply(await MSSQLDatabase_1.createAndConnectMSSQLDatabase(config.reconnectConfig, config.storageConfig, config.logErrors));
};
exports.createAndConnectDatabase = createAndConnectDatabase;
//# sourceMappingURL=SqlDatabase.js.map