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
exports.updateFuturePredictionQuota = exports.getPredictionQuota = void 0;
const predictionQuota_model_1 = require("../models/predictionQuota.model");
const getPredictionQuota = (user, day) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verificar cuántas predicciones disponibles tiene el usuario para ese dia
        let predictionQuota = yield predictionQuota_model_1.PredictionQuota.findOne({
            where: {
                user_id: user.id,
                date: day,
            },
        });
        // Si no existe un registro de cuota de predicciones para el usuario, crearlo
        if (!predictionQuota) {
            predictionQuota = yield predictionQuota_model_1.PredictionQuota.create({
                user_id: user.id,
                date: day,
                daily_predictions_left: 5,
                future_predictions_left: 2,
            });
        }
        return predictionQuota;
    }
    catch (error) {
        // Lanzar el error para que se pueda manejar en otro nivel
        throw new Error(`Error al consultar las cuotas de predicción: ${error.message}`);
    }
});
exports.getPredictionQuota = getPredictionQuota;
const updateFuturePredictionQuota = (user, futurePredictionsByDay) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Actualizar las cuotas futuras para los días afectados
        for (const futureDate in futurePredictionsByDay) {
            let futureQuota = yield predictionQuota_model_1.PredictionQuota.findOne({
                where: { user_id: user.id, date: futureDate },
            });
            if (!futureQuota) {
                // Si no existe la cuota futura, crear una nueva para ese día con los valores predeterminados
                futureQuota = yield predictionQuota_model_1.PredictionQuota.create({
                    user_id: user.id,
                    date: new Date(futureDate),
                    daily_predictions_left: 5,
                    future_predictions_left: 2,
                });
            }
            // Reducir las predicciones futuras disponibles
            yield futureQuota.update({
                future_predictions_left: futureQuota.future_predictions_left -
                    futurePredictionsByDay[futureDate],
            });
        }
        return `Quotes updated successfully.`;
    }
    catch (error) {
        // Captura de errores y retorno de mensaje informativo
        console.error("Error updating future prediction quotas:", error);
        return `Error actualizando quoutas futuras: ${error.message}`;
    }
});
exports.updateFuturePredictionQuota = updateFuturePredictionQuota;
//# sourceMappingURL=predictionQuota.service.js.map