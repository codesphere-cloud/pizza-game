import {has} from "./has";
import {copy} from "./copy";

/**
 * A deep copy copies all fields, and copies all the fields values, recursive.
 * Beware that a cyclic structure like so
 ```
 const a = {b: null};
 const b = {a: a};
 a.b = b;
 ```
 * will produce a stack overflow error when deepCopied, i.e. cannot be copied with this function
 *
 * @param {any[] | any} src the object to be copied
 */
export const deepCopy = <T = any>(src: T): T => {
    if (!has(src)) {
        return src;
    }
    const type = typeof src;
    if (type === 'string' || type === 'number' || type === 'boolean' || type === 'symbol') {
        // the immutable types are returned as is
        return src;
    }
    if (type === 'function') {
        throw new Error('deepCopy of a function is not yet implemented');
    }
    const result = copy(src);
    if (src instanceof Date) {
        // for whatever reason, dates are special objects and cannot be copied as normal objects would
        // and we don't need to deepCopy them. Just return the reference.
        return result;
    }
    for (const propName in result) {
        result[propName] = deepCopy(result[propName]);
    }
    return result;
};
