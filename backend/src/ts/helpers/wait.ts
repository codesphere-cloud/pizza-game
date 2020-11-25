/**
 * Wait (returns a Promise which resolves after a timeout).
 * Note that this function is intended to be used like "await wait(duration);"
 * inside an async function.
 * @param {number} duration of the wait, in ms
 * @returns {Promise<void>} a promise.
 */
export const wait = (duration: number): Promise<void> => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
};
