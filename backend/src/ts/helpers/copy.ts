import {has} from "./has";

/**
 * Make a shallow copy of {@param src}.
 * That is a new object that has all the properties of {@param src}, with the identical values.
 * @param src the object to copy
 */
export const copy = <T = any>(src: T): T => {
    if (!has(src)) {
        return src;
    }
    const type = typeof src;
    if (type === 'string' || type === 'number' || type === 'boolean' || type === 'symbol') {
        // the immutable types are returned as is
        return src;
    }
    if (type === 'function') {
        throw new Error('copy of a function is not yet implemented');
    }
    if (Array.isArray(src)) {
        return (src as any[]).slice() as any;
    }
    if (src instanceof Date) {
        // for whatever reason, dates are special objects and cannot be copied as normal objects would.
        // so we do it like so:
        return new Date((src as Date).getTime()) as any;
    }
    return Object.assign(Object.create(Object.getPrototypeOf(src)), src);
};