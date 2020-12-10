"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.milliSecondsInAWeek = exports.milliSecondsInADay = exports.milliSecondsInAnHour = exports.milliSecondsInAMinute = exports.milliSecondsInASecond = exports.daysInAWeek = exports.hoursInADay = void 0;
exports.hoursInADay = 24;
exports.daysInAWeek = 7;
exports.milliSecondsInASecond = 1000;
exports.milliSecondsInAMinute = 60 * exports.milliSecondsInASecond;
exports.milliSecondsInAnHour = 60 * exports.milliSecondsInAMinute;
exports.milliSecondsInADay = exports.hoursInADay * exports.milliSecondsInAnHour;
exports.milliSecondsInAWeek = exports.daysInAWeek * exports.milliSecondsInADay;
//# sourceMappingURL=timeSpan.js.map