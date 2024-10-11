"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const predictionRecord_controller_1 = require("../controllers/predictionRecord.controller");
const router = (0, express_1.Router)();
router.get('/predictionHistory', predictionRecord_controller_1.getPredictionHistoryByUser);
exports.default = router;
//# sourceMappingURL=predictionRecord.routes.js.map