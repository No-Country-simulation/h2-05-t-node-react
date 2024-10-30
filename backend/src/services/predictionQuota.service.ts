import { PredictionQuota } from "../models/predictionQuota.model";
import { User } from "../models/user.model";

export const getPredictionQuota = async (userId: string, day: Date) => {
  try {
  
    // Verificar cuántas predicciones disponibles tiene el usuario para ese dia
    let predictionQuota = await PredictionQuota.findOne({
      where: {
        user_id: userId,
        date: day,
      },
    });

    // Si no existe un registro de cuota de predicciones para el usuario, crearlo
    if (!predictionQuota) {
      predictionQuota = await PredictionQuota.create({
        user_id: userId,
        date: new Date(day),
        daily_predictions_left: 5,
        future_predictions_left: 2,
      });
    }
    return predictionQuota;
  } catch (error) {
    // Lanzar el error para que se pueda manejar en otro nivel
    throw new Error(`Error al consultar las cuotas de predicción: ${(error as Error).message}`);
  }
};

export const updateFuturePredictionQuota = async (
  user: User,
  futurePredictionsByDay: { [date: string]: number }
) => {
  try {
    // Actualizar las cuotas futuras para los días afectados
    for (const futureDate in futurePredictionsByDay) {
      let futureQuota = await PredictionQuota.findOne({
        where: { user_id: user.id, date: futureDate },
      });

      if (!futureQuota) {
        // Si no existe la cuota futura, crear una nueva para ese día con los valores predeterminados
        futureQuota = await PredictionQuota.create({
          user_id: user.id,
          date: new Date(futureDate),
          daily_predictions_left: 5,
          future_predictions_left: 2,
        });
      }

      // Reducir las predicciones futuras disponibles
      await futureQuota.update({
        future_predictions_left:
          futureQuota.future_predictions_left -
          futurePredictionsByDay[futureDate],
      });
    }
    return `Quotes updated successfully.`;
  } catch (error) {
    // Captura de errores y retorno de mensaje informativo
    console.error("Error updating future prediction quotas:", error);
    return `Error actualizando quoutas futuras: ${(error as Error).message}`;
  }
};
