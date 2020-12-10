"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepCopy = void 0;
const has_1 = require("./has");
const copy_1 = require("./copy");
const deepCopy = (src) => {
    if (!has_1.has(src)) {
        return src;
    }
    const type = typeof src;
    if (type === 'string' || type === 'number' || type === 'boolean' || type === 'symbol') {
        return src;
    }
    if (type === 'function') {
        throw new Error('deepCopy of a function is not yet implemented');
    }
    const result = copy_1.copy(src);
    if (src instanceof Date) {
        return result;
    }
    for (const propName in result) {
        result[propName] = exports.deepCopy(result[propName]);
    }
    return result;
};
exports.deepCopy = deepCopy;
//# sourceMappingURL=deepCopy.js.map