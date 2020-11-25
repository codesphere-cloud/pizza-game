import { size } from "./size";
import { has } from "./has";

/** Evaluates to true if a string, and array or an object is empty.
 * Note that undefined or null properties are considered as not present for objects. */
export const isEmpty = (objOrArrayOrString: unknown): boolean => {
    if (!has(objOrArrayOrString)) {
        return true;
    }
    if (typeof objOrArrayOrString === "string") {
        return objOrArrayOrString === "";
    } else if (Array.isArray(objOrArrayOrString)) {
        return objOrArrayOrString.length === 0;
    }
    return size(objOrArrayOrString as { [key: string]: unknown; }) === 0;
};