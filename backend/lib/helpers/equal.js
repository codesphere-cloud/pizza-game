"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.equal = void 0;
const equal = (value, other) => {
    if (value === other) {
        return true;
    }
    const compare = (item1, item2) => {
        const item1Type = Object.prototype.toString.call(item1);
        if (["[object Array]", "[object Object]"].indexOf(item1Type) >= 0) {
            return exports.equal(item1, item2);
        }
        else {
            if (item1Type !== Object.prototype.toString.call(item2)) {
                return false;
            }
            if (item1Type === "[object Function]") {
                return item1.toString() === item2.toString();
            }
            else {
                return item1 === item2;
            }
        }
    };
    const typeValue = Object.prototype.toString.call(value);
    if (typeValue !== Object.prototype.toString.call(other)) {
        return false;
    }
    if (["[object Array]", "[object Object]"].indexOf(typeValue) < 0) {
        return value === other;
    }
    const valueLen = typeValue === "[object Array]" ?
        value.length :
        Object.keys(value).length;
    const otherLen = typeValue === "[object Array]" ?
        other.length :
        Object.keys(other).length;
    if (valueLen !== otherLen) {
        return false;
    }
    if (typeValue === "[object Array]") {
        for (let i = 0; i < valueLen; i++) {
            if (!compare(value[i], other[i])) {
                return false;
            }
        }
    }
    else {
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                if (!compare(value[key], other[key])) {
                    return false;
                }
            }
        }
    }
    return true;
};
exports.equal = equal;
//# sourceMappingURL=equal.js.map