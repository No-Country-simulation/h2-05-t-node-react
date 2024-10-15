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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const predictionQuota_model_1 = require("../models/predictionQuota.model");
// Ejecutar todos los días a la medianoche
node_cron_1.default.schedule('0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date(); // Fecha actual
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1); // Obtenemos el día siguiente
    // Resetear predicciones diarias a 5 para todos los usuarios
    yield predictionQuota_model_1.PredictionQuota.update({ daily_predictions_left: 5 }, {
        where: {
            date: today, // Solo para el día de hoy
        },
    });
    // Ajustar las predicciones futuras que ya se hicieron para mañana
    const futureQuotas = yield predictionQuota_model_1.PredictionQuota.findAll({
        where: {
            date: tomorrow, // Encontrar cuotas para mañana
        },
    });
    // Restar las futuras del número total de predicciones diarias para mañana
    for (const quota of futureQuotas) {
        if (quota.future_predictions_left < 2) {
            const usedFutures = 2 - quota.future_predictions_left;
            quota.daily_predictions_left -= usedFutures;
            if (quota.daily_predictions_left < 0) {
                quota.daily_predictions_left = 0;
            }
            yield quota.save();
        }
    }
}));
//# sourceMappingURL=adjustPredictionsCron.js.map