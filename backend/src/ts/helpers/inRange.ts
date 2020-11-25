/**
 * Returns true if x is between the provided (inclusive) bounds.
 */
export const inRange = (x: number, inclusiveBoundA: number, inclusiveBoundB: number): boolean =>
    ((x - inclusiveBoundA) * (x - inclusiveBoundB) <= 0);