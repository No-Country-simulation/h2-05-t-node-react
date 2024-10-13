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
exports.predictionHistoryByUser = void 0;
const sequelize_1 = require("sequelize");
const prediction_model_1 = require("../models/prediction.model");
const predictionRecord_model_1 = require("../models/predictionRecord.model");
const predictionHistoryByUser = (userId, filters) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, startDate, endDate, page = 1 } = filters;
    const limit = 10; // Máximo de 10 resultados por página
    const offset = (page - 1) * limit; // Calcular el offset basado en la página actual
    try {
        const predictionsWithHistory = yield prediction_model_1.Prediction.findAndCountAll({
            where: Object.assign({ user_id: userId }, (status && { status })),
            include: [
                {
                    model: predictionRecord_model_1.PredictionRecord,
                    where: Object.assign({}, (startDate &&
                        endDate && {
                        // Filtrar por rango de fechas en el historial
                        timestamp: {
                            [sequelize_1.Op.between]: [startDate, endDate],
                        },
                    })),
                },
            ],
            attributes: ["total_points", "status"], // Incluir los campos `total_points` y `status`
            limit, // Limitar a 10 resultados por página
            offset, // Saltar resultados basados en la página actual
        });
        const totalPages = Math.ceil(predictionsWithHistory.count / limit);
        return {
            results: predictionsWithHistory.rows,
            totalPages,
            currentPage: page,
        };
    }
    catch (error) {
        console.error("Error fetching paginated prediction history:", error);
        throw error;
    }
});
exports.predictionHistoryByUser = predictionHistoryByUser;
//# sourceMappingURL=predictionRecord.service.js.map