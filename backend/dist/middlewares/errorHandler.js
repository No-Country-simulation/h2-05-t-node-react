"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, req, res, next) {
    console.error('ERROR:', err.stack);
    res.status(500).json({ message: err.message });
}
//# sourceMappingURL=errorHandler.js.map