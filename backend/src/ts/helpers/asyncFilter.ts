export const asyncFilter = <T = any>(arr: T[], predicate: (e: T) => Promise<boolean>) => Promise.all(arr.map(predicate))
    .then((results) => arr.filter((v, index) => results[index]));