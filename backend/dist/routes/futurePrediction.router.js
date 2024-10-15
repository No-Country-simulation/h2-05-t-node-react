"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const predictionController_1 = require("../controllers/predictionController");
const prediction_controller_1 = require("../controllers/prediction.controller");
const router = express_1.default.Router();
router.post('/use-future-prediction', predictionController_1.createFuturePrediction);
router.get('/predictions/:id', prediction_controller_1.userPredictions);
exports.default = router;
//# sourceMappingURL=futurePrediction.router.js.map