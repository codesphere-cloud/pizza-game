/**
 * Return a random string.
 * The string has a random length between 0 and 7 characters.
 * @returns {string} a string containing random characters.
 */
export const randomString = (): string => {
    return Math.random().toString(36).substring(0, 7);
};
