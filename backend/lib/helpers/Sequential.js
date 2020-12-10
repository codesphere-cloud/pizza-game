"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sequential = void 0;
class Sequential {
    constructor(start = 1) {
        this.sequential = start;
    }
    increment() {
        return this.sequential++;
    }
}
exports.Sequential = Sequential;
//# sourceMappingURL=Sequential.js.map