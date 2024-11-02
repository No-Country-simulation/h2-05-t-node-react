import cron from "node-cron";
import { PredictionQuota } from "../models/prediction_quota.model";


// Ejecutar todos los días a la medianoche
cron.schedule('0 0 * * *', async () => {
  const today = new Date(); // Fecha actual
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1); // Obtenemos el día siguiente

  // Resetear predicciones diarias a 5 para todos los usuarios
  await PredictionQuota.update({ daily_predictions_left: 5 }, {
    where: {
      date: today, // Solo para el día de hoy
    },
  });

  // Ajustar las predicciones futuras que ya se hicieron para mañana
  const futureQuotas = await PredictionQuota.findAll({
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
      await quota.save();
    }
  }
});
