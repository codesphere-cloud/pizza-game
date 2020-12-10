"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncFilter = void 0;
const asyncFilter = (arr, predicate) => Promise.all(arr.map(predicate))
    .then((results) => arr.filter((v, index) => results[index]));
exports.asyncFilter = asyncFilter;
//# sourceMappingURL=asyncFilter.js.map