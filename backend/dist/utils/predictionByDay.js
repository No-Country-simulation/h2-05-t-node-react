"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePredictionsByDay = void 0;
const calculatePredictionsByDay = (predictions, todayString) => {
    // Contadores de predicciones
    let totalDailyPredictions = 0;
    const futurePredictionsByDay = {};
    // Contar las predicciones diarias y futuras en la solicitud
    for (const prediction of predictions) {
        if (prediction.quotaType === "daily" &&
            prediction.date.toDateString() === todayString) {
            totalDailyPredictions++;
        }
        else if (prediction.quotaType === "future") {
            const futureDateString = prediction.date.toISOString().split("T")[0];
            // Inicializar el contador para ese día futuro si aún no existe
            if (!futurePredictionsByDay[futureDateString]) {
                futurePredictionsByDay[futureDateString] = 0;
            }
            futurePredictionsByDay[futureDateString]++;
            // Verificar si se excede el límite de 2 futuras predicciones para ese día
            if (futurePredictionsByDay[futureDateString] > 2) {
                throw new Error(`No puedes hacer más de 2 predicciones futuras para el día ${futureDateString}.`);
            }
        }
    }
    return { totalDailyPredictions, futurePredictionsByDay };
};
exports.calculatePredictionsByDay = calculatePredictionsByDay;
//# sourceMappingURL=predictionByDay.js.map