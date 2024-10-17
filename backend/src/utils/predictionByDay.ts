export const calculatePredictionsByDay = (
  predictions: {
    match_id: string;
    predictionType: "match" | "player";
    selectedPredictionType: "win_home" | "win_away" | "draw" | "player";
    fee: number;
    quotaType: "daily" | "future";
    date: Date;
  }[],todayString: string
) => {
  // Contadores de predicciones
  let totalDailyPredictions = 0;
  const futurePredictionsByDay: { [date: string]: number } = {};

  // Contar las predicciones diarias y futuras en la solicitud
  for (const prediction of predictions) {
    if (
      prediction.quotaType === "daily" &&
      prediction.date.toDateString() === todayString
    ) {
      totalDailyPredictions++;
    } else if (prediction.quotaType === "future") {
      const futureDateString = prediction.date.toISOString().split("T")[0];

      // Inicializar el contador para ese día futuro si aún no existe
      if (!futurePredictionsByDay[futureDateString]) {
        futurePredictionsByDay[futureDateString] = 0;
      }

      futurePredictionsByDay[futureDateString]++;

      // Verificar si se excede el límite de 2 futuras predicciones para ese día
      if (futurePredictionsByDay[futureDateString] > 2) {
        throw new Error(
          `No puedes hacer más de 2 predicciones futuras para el día ${futureDateString}.`
        );
      }
    }
  }
  return { totalDailyPredictions, futurePredictionsByDay };
};
