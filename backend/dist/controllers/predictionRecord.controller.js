"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPredictionHistoryByUser = void 0;
const predictionRecord_service_1 = require("../services/predictionRecord.service");
const enumsErrors_1 = require("../utils/enumsErrors");
const HttpResponse = new enumsErrors_1.httpResponse();
const getPredictionHistoryByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = req.body.filters;
        const userId = req.body.id;
        const historyPrediction = yield (0, predictionRecord_service_1.predictionHistoryByUser)(userId, filters);
        if (!historyPrediction)
            return HttpResponse.DATA_BASE_ERROR(res, "Historial de Predicciones Vacío");
        return HttpResponse.OK(res, historyPrediction);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.getPredictionHistoryByUser = getPredictionHistoryByUser;
//# sourceMappingURL=predictionRecord.controller.js.map