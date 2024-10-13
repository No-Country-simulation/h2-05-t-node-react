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
exports.updatePrediction = exports.deletePrediction = exports.createPrediction = exports.getPrediction = exports.getPredictions = void 0;
const prediction_model_1 = require("../models/prediction.model");
const predictionRecord_model_1 = require("../models/predictionRecord.model");
//import { Ranking } from "../models/ranking.model";
const ranking_service_1 = require("./ranking.service");
const getPredictions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prediction = yield prediction_model_1.Prediction.findAll();
        if (!prediction)
            throw new Error("Predicciones no encontrados");
        return prediction;
    }
    catch (error) {
        throw new Error(`Error al obtener las Predicciones: ${error.message}`);
    }
});
exports.getPredictions = getPredictions;
const getPrediction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prediction = yield prediction_model_1.Prediction.findOne(id);
        if (!prediction)
            throw new Error("Predicción no encontrados");
        return prediction;
    }
    catch (error) {
        throw new Error(`Error al obtener las Predicciones: ${error.message}`);
    }
});
exports.getPrediction = getPrediction;
const createPrediction = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prediction = yield prediction_model_1.Prediction.create(data);
        if (!prediction)
            throw new Error("Predicción no creado");
        if (!prediction.user_id || !prediction.id) {
            throw new Error("Datos faltantes para crear el registro de la predicción.");
        }
        const dataRecord = {
            user_id: prediction.user_id,
            prediction_id: prediction.id,
        };
        const predRecord = yield predictionRecord_model_1.PredictionRecord.create(dataRecord);
        if (!predRecord)
            throw new Error("Registro no creado");
        return { msg: "Predicción creado" };
    }
    catch (error) {
        throw new Error(`Error al crear la Predicción: ${error.message}`);
    }
});
exports.createPrediction = createPrediction;
const deletePrediction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prediction = yield prediction_model_1.Prediction.destroy({ where: { id: id } });
        if (!prediction)
            throw new Error("Predicción no eliminada");
        return { msg: "Predicción eliminada" };
    }
    catch (error) {
        throw new Error(`Error al eliminar la Predicción: ${error.message}`);
    }
});
exports.deletePrediction = deletePrediction;
const updatePrediction = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prediction = yield prediction_model_1.Prediction.findByPk(id);
        if (!prediction) {
            throw new Error("Predicción no encontrada");
        }
        // Guardar el estado anterior para comparar
        const previousStatus = prediction.status;
        // Actualizar los datos de la predicción
        yield prediction.update(updateData);
        // Verificar si la predicción ha cambiado a "win" cambiar por el estada usado
        if (updateData.status === "win" && previousStatus !== "win") {
            const point = (0, ranking_service_1.addPoints)(id, prediction.total_points);
            if (!point) {
                throw new Error("No se pudo añadir los puntos a la clasificación");
            }
        }
        // Actualizar registro en el historial de predicciones
        const predictionRecord = yield predictionRecord_model_1.PredictionRecord.findOne({
            where: { prediction_id: id },
        });
        if (predictionRecord) {
            // Si existe, actualizar los datos del registro
            yield predictionRecord.update(updateData);
        }
        else {
            // Si no existe, crear un nuevo registro (para casos donde no haya historial previo)
            yield predictionRecord_model_1.PredictionRecord.create(Object.assign(Object.assign({ prediction_id: id }, updateData), { timestamp: new Date() }));
        }
        return { msg: "Predicción actualizado" };
    }
    catch (error) {
        throw new Error(`Error al actualizado la Predicción: ${error.message}`);
    }
});
exports.updatePrediction = updatePrediction;
//# sourceMappingURL=prediction.service.js.map