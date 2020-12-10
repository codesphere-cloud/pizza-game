"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inRange = void 0;
const inRange = (x, inclusiveBoundA, inclusiveBoundB) => ((x - inclusiveBoundA) * (x - inclusiveBoundB) <= 0);
exports.inRange = inRange;
//# sourceMappingURL=inRange.js.map