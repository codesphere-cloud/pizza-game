"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.LogTag = void 0;
const Reply_1 = require("./Reply");
var LogTag;
(function (LogTag) {
    LogTag["Default"] = "Default";
    LogTag["Notify"] = "Notify";
})(LogTag = exports.LogTag || (exports.LogTag = {}));
const log = (message, code = Reply_1.Status.Ok, ...tags) => {
    const tagsString = tags.map(tag => `, #${tag}`).join("");
    const logString = `[${code}, ${new Date().toISOString()}${tagsString}]: ${message}`;
    console.log(logString);
    return logString;
};
exports.log = log;
//# sourceMappingURL=log.js.map