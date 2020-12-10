"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.definedKeys = void 0;
const keys_1 = require("./keys");
const has_1 = require("./has");
const definedKeys = (obj) => keys_1.keys(obj).filter(key => has_1.has(obj[key]));
exports.definedKeys = definedKeys;
//# sourceMappingURL=definedKeys.js.map