"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecondDate = exports.getFirstDate = void 0;
const getFirstDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 2); // Restar un día
    return today.toISOString().split("T")[0]; // Formato YYYY-MM-DD
};
exports.getFirstDate = getFirstDate;
const getSecondDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // Restar un día
    return today.toISOString().split("T")[0]; // Formato YYYY-MM-DD
};
exports.getSecondDate = getSecondDate;
//# sourceMappingURL=days.js.map