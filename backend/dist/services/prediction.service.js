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
exports.updateBet = exports.updatePrediction = exports.deletePrediction = exports.createPredictions = exports.createPrediction = exports.getPrediction = exports.getPredictions = void 0;
const prediction_model_1 = require("../models/prediction.model");
const predictionRecord_model_1 = require("../models/predictionRecord.model");
//import { Ranking } from "../models/ranking.model";
const ranking_service_1 = require("./ranking.service");
const prediction_info_model_1 = require("../models/prediction_info.model");
const pointCalculation_1 = require("../utils/pointCalculation");
const predictionByDay_1 = require("../utils/predictionByDay");
const predictionQuota_service_1 = require("./predictionQuota.service");
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
        return prediction;
    }
    catch (error) {
        throw new Error(`Error al crear la Predicción: ${error.message}`);
    }
});
exports.createPrediction = createPrediction;
const createPredictions = (user, predictions, type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        const todayString = today.toISOString().split("T")[0]; // Formatear la fecha en 'YYYY-MM-DD'
        // Verificar cuántas predicciones disponibles tiene el usuario para hoy
        let predictionQuota = yield (0, predictionQuota_service_1.getPredictionQuota)(user, today);
        const { totalDailyPredictions, futurePredictionsByDay } = (0, predictionByDay_1.calculatePredictionsByDay)(predictions, todayString);
        // Verificar si se exceden los límites diarios
        if (totalDailyPredictions > predictionQuota.daily_predictions_left) {
            throw new Error(`No tienes suficientes predicciones diarias disponibles (${predictionQuota.daily_predictions_left} restantes).`);
        }
        // Calcular los puntos totales basados en el tipo de predicción
        const totalPoints = (0, pointCalculation_1.calculatePoints)(predictions, type);
        // Crear la predicción principal y el registro en una sola transacción
        const newPrediction = yield prediction_model_1.Prediction.create({
            user_id: user.id,
            type: type,
            total_points: totalPoints,
            status: "pending",
        });
        if (!newPrediction)
            throw new Error("Error al crear la predicción.");
        // Crear el registro de predicción
        yield predictionRecord_model_1.PredictionRecord.create({
            user_id: user.id,
            prediction_id: newPrediction.id,
        });
        // Crear múltiples PredictionInfo en una sola operación
        const predictionInfos = predictions.map((prediction) => ({
            match_id: prediction.match_id,
            prediction_id: newPrediction.id, // Relacionar con la predicción creada
            predictionType: prediction.predictionType,
            predictionQuotaType: prediction.quotaType,
            selectedPredictionType: prediction.selectedPredictionType,
            fee: prediction.fee,
            prediction_date: prediction.date,
            status: "pending",
        }));
        yield prediction_info_model_1.PredictionInfo.bulkCreate(predictionInfos);
        // Si la predicción es encadenada, actualizar los puntos totales
        if (type === "chained") {
            yield newPrediction.update({ total_points: totalPoints });
        }
        // Actualizar las cuotas de predicción futuras
        yield (0, predictionQuota_service_1.updateFuturePredictionQuota)(user, futurePredictionsByDay);
        // Actualizar las cuotas diarias después de crear las predicciones
        yield predictionQuota.update({
            daily_predictions_left: predictionQuota.daily_predictions_left - totalDailyPredictions,
        });
        return `Has creado ${predictionInfos.length} predicciones con éxito.`;
    }
    catch (error) {
        console.error("Error al crear predicciones:", error);
        throw new Error(`Error al crear predicciones: ${error.message}`);
    }
});
exports.createPredictions = createPredictions;
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
const updateBet = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bet = yield prediction_model_1.Prediction.findOne(id);
        if (!bet) {
            throw new Error('No existe la predicción');
        }
        const update = yield prediction_model_1.Prediction.update(data, { where: { id: id } });
        return { data: update, msg: "Predicción actualizado" };
    }
    catch (error) {
        throw new Error(`Error al actualizado la Predicción: ${error.message}`);
    }
});
exports.updateBet = updateBet;
//# sourceMappingURL=prediction.service.js.map