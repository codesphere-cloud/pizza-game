import {has} from "./has";

/**
 * remove all but a-z, A-Z, 0-9 from value
 * @param value the string value
 * @returns the value with only the allowed chars
 */
export const removeAllNonCharsNonDigits = (value: string): string => {
    if (!has(value)) {
        return value;
    }
    return value.replace(/[^a-zA-Z0-9_]/g, '');
};