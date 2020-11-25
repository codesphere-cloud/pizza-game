import {has} from "./has";

/** Evaluates to true if all provided objects are neither null nor undefined. */
export const hasAll = (...objects: unknown[]): boolean => objects.every(has);