import {has} from "./has";
import {values} from "./values";
import {definedKeys} from "./definedKeys";

/**
 * Counts the number of properties in an object which are neither null, nor undefined nor not set.
 */
export const size = (obj: { [key: string]: unknown }) => definedKeys(obj).length;