"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePoints = void 0;
const calculatePoints = (predictions, type) => {
    // Cálculo de puntos en caso de predicciones encadenadas
    let totalPoints = 1; // Inicia con 1 punto base para simple y se acumula para encadenadas
    if (type === "chained") {
        let multiplier = 10; // Empieza en 10 para 2 predicciones encadenadas
        for (let i = 0; i < predictions.length; i++) {
            totalPoints *= predictions[i].fee;
            if (i > 0) {
                multiplier += 10; // Crece por 10 por cada predicción extra
            }
        }
        totalPoints *= multiplier; // Aplica el multiplicador final
    }
    else if (type === "simple") {
        totalPoints = 1 * predictions[0].fee; // En simple solo se usa el fee de la única predicción
    }
    return totalPoints;
};
exports.calculatePoints = calculatePoints;
//# sourceMappingURL=pointCalculation.js.map