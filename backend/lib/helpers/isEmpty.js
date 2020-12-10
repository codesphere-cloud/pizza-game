"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
const size_1 = require("./size");
const has_1 = require("./has");
const isEmpty = (objOrArrayOrString) => {
    if (!has_1.has(objOrArrayOrString)) {
        return true;
    }
    if (typeof objOrArrayOrString === "string") {
        return objOrArrayOrString === "";
    }
    else if (Array.isArray(objOrArrayOrString)) {
        return objOrArrayOrString.length === 0;
    }
    return size_1.size(objOrArrayOrString) === 0;
};
exports.isEmpty = isEmpty;
//# sourceMappingURL=isEmpty.js.map