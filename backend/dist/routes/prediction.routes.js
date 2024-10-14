"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prediction_controller_1 = require("../controllers/prediction.controller");
const prediction_validator_1 = require("../middlewares/prediction.validator");
const router = (0, express_1.Router)();
router.get('', prediction_controller_1.getAllPredictions);
router.get('/:id', prediction_controller_1.getOnePrediction);
router.post('/createPrediction', prediction_validator_1.predicionValidator, prediction_validator_1.handleUserValidationErrors, prediction_controller_1.createOnePrediction);
router.delete('/:id', prediction_controller_1.deleteOnePrediction);
router.put('/:id', prediction_controller_1.updateOnePrediction);
exports.default = router;
//# sourceMappingURL=prediction.routes.js.map