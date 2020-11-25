import {keys} from "./keys";
import {has} from "./has";

/**
 * Returns an array of a given object's own enumerable property names
 * which are neither null nor undefined, iterated in the same order that a normal loop would.
 */
export const definedKeys = (obj: Record<string | number, unknown>): string[] => keys(obj).filter(key => has(obj[key]));