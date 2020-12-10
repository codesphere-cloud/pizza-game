"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAllNonCharsNonDigits = void 0;
const has_1 = require("./has");
const removeAllNonCharsNonDigits = (value) => {
    if (!has_1.has(value)) {
        return value;
    }
    return value.replace(/[^a-zA-Z0-9_]/g, '');
};
exports.removeAllNonCharsNonDigits = removeAllNonCharsNonDigits;
//# sourceMappingURL=removeAllNonCharNonDigits.js.map