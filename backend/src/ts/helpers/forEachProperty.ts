/**
 * Lets you loop through the keys and their associated values of an object.
 */
export const forEachProperty = <T>(object: T, looper: (key: keyof T, value: T[keyof T]) => void): void => {
    for (const key in object) {
        looper(key, object[key]);
    }
};