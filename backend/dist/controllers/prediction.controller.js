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
exports.updateOnePrediction = exports.deleteOnePrediction = exports.createOnePrediction = exports.getOnePrediction = exports.getAllPredictions = void 0;
const prediction_service_1 = require("../services/prediction.service");
const enumsErrors_1 = require("../utils/enumsErrors");
const HttpResponse = new enumsErrors_1.httpResponse();
const getAllPredictions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prediction = yield (0, prediction_service_1.getPredictions)();
        if (!prediction)
            return HttpResponse.DATA_BASE_ERROR(res, "Predicciones no encontradas");
        return HttpResponse.OK(res, prediction);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.getAllPredictions = getAllPredictions;
const getOnePrediction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const prediction = yield (0, prediction_service_1.getPrediction)(id);
        if (!prediction)
            return HttpResponse.DATA_BASE_ERROR(res, "Predicción no encontrada");
        return HttpResponse.OK(res, prediction);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.getOnePrediction = getOnePrediction;
const createOnePrediction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const prediction = yield (0, prediction_service_1.createPrediction)(data);
        if (!prediction)
            return HttpResponse.DATA_BASE_ERROR(res, "Error al cargar datos");
        return HttpResponse.OK(res, prediction);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.createOnePrediction = createOnePrediction;
const deleteOnePrediction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const prediction = yield (0, prediction_service_1.deletePrediction)(id);
        if (!prediction)
            return HttpResponse.DATA_BASE_ERROR(res, "Error al eliminar predición");
        return HttpResponse.OK(res, prediction);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.deleteOnePrediction = deleteOnePrediction;
const updateOnePrediction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const prediction = yield (0, prediction_service_1.updatePrediction)(id, data);
        if (!prediction)
            return HttpResponse.DATA_BASE_ERROR(res, "Error al actualizar predición");
        return HttpResponse.OK(res, prediction);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.updateOnePrediction = updateOnePrediction;
//# sourceMappingURL=prediction.controller.js.map