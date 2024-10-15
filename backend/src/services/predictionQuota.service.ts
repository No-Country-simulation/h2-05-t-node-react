
import { PredictionQuota } from "../models/predictionQuota.model";
import { User } from "../models/user.model";

  export const getPredictionQuota = async (user: User, day: Date) => {

    // Verificar cuántas predicciones disponibles tiene el usuario para ese dia
    let predictionQuota = await PredictionQuota.findOne({
      where: {
        user_id: user.id,
        date: day,
      },
    });
  
    // Si no existe un registro de cuota de predicciones para el usuario, crearlo
    if (!predictionQuota) {
      predictionQuota = await PredictionQuota.create({
        user_id: user.id,
        date: day,
        daily_predictions_left: 5,
        future_predictions_left: 2,
      });
    }
  return predictionQuota;
  }
  