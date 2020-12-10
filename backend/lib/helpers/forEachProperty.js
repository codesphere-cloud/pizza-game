"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forEachProperty = void 0;
const forEachProperty = (object, looper) => {
    for (const key in object) {
        looper(key, object[key]);
    }
};
exports.forEachProperty = forEachProperty;
//# sourceMappingURL=forEachProperty.js.map