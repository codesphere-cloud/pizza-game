/**
 * Checks if two arbitrary objects or primitives are deeply equal.
 * This was modified from: https://gomakethings.com/
 * check-if-two-arrays-or-objects-are-equal-with-javascript
 * @param {any} value any value
 * @param {any} other any other value to compare with {@param value}
 * @returns {boolean} true if the values equal each other
 */
export const equal = (value: unknown, other: unknown): boolean => {
    if (value === other) {
        return true;
    }
    const compare = (item1: unknown, item2: unknown): boolean => {
        const item1Type = Object.prototype.toString.call(item1);
        if (["[object Array]", "[object Object]"].indexOf(item1Type) >= 0) {
            return equal(item1, item2);
        } else {
            if (item1Type !== Object.prototype.toString.call(item2)) {
                return false;
            }
            if (item1Type === "[object Function]") {
                return (item1 as any).toString() === (item2 as any).toString();

            } else {
                return item1 === item2;
            }
        }
    };

    const typeValue = Object.prototype.toString.call(value);
    if (typeValue !== Object.prototype.toString.call(other)) {
        return false;
    }
    if (["[object Array]", "[object Object]"].indexOf(typeValue) < 0) {
        // At this point value is not an object and not an array
        return value === other;
    }

    // At this point value is either an object or an array
    const valueLen = typeValue === "[object Array]" ?
        (value as []).length :
        Object.keys(value as any).length;
    const otherLen = typeValue === "[object Array]" ?
        (other as []).length :
        Object.keys(other as any).length;
    if (valueLen !== otherLen) {
        return false;
    }

    if (typeValue === "[object Array]") {
        for (let i = 0; i < valueLen; i++) {
            if (!compare((value as [])[i], (other as [])[i])) {
                return false;
            }
        }
    } else {
        for (const key in value as any) {
            if ((value as any).hasOwnProperty(key)) {
                if (!compare((value as any)[key], (other as any)[key])) {
                    return false;
                }
            }
        }
    }
    return true;
};