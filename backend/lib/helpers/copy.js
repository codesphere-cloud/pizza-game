"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copy = void 0;
const has_1 = require("./has");
const copy = (src) => {
    if (!has_1.has(src)) {
        return src;
    }
    const type = typeof src;
    if (type === 'string' || type === 'number' || type === 'boolean' || type === 'symbol') {
        return src;
    }
    if (type === 'function') {
        throw new Error('copy of a function is not yet implemented');
    }
    if (Array.isArray(src)) {
        return src.slice();
    }
    if (src instanceof Date) {
        return new Date(src.getTime());
    }
    return Object.assign(Object.create(Object.getPrototypeOf(src)), src);
};
exports.copy = copy;
//# sourceMappingURL=copy.js.map