/**
 * Evaluates to true if the provided object is neither null nor undefined.
 *
 * Note that this function is more strict than the hasOwnProperty check.
 */
export const has = <T>(obj: T): obj is Exclude<T, null | undefined> => obj !== null && obj !== undefined;