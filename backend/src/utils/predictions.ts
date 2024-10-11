
import { Op } from 'sequelize';
import { httpResponse } from './enumsErrors';
import { UserPredictions } from '../models/UserPredictions.model';
import { FuturePredictions } from '../models/FuturePredictions.model';
import { getUser } from '../services/user.service';
// Asegúrate de que esta clase esté correctamente importada

let MAX_PREDICTIONS_PER_DAY = 5;
const MAX_FUTURE_PREDICTIONS = 2;
const MAX_DAYS_IN_FUTURE = 5;

const HttpResponse = new httpResponse();

export const canCreatePrediction = async (userId: string, res: any) => {
  const today = new Date().toISOString().split('T')[0];  // Fecha de hoy
  const user = await getUser(userId);
  if(user.subscription === true){
    MAX_PREDICTIONS_PER_DAY = 10
  }
  // Verificar las predicciones del usuario para hoy
  const todayPredictions = await UserPredictions.findOne({
    where: { user_id: userId, date: today }
  });

  // Verificar si el usuario tiene predicciones futuras pendientes por descontar
  const futurePredictionsPending = await FuturePredictions.findOne({
    where: {
      user_id: userId,
      predictions_taken: { [Op.gt]: 0 }  // Buscar si tiene predicciones futuras no descontadas
    }
  });

  // Si tiene predicciones futuras pendientes, no puede usar predicciones futuras
  if (futurePredictionsPending) {
    return HttpResponse.BAD_REQUEST_ERROR(res, "No puedes usar predicciones futuras hasta que se descuenten las usadas previamente.");
  }

  // Verificar si el usuario ha alcanzado el límite de predicciones de hoy
  if (todayPredictions && todayPredictions.predictions_used >= MAX_PREDICTIONS_PER_DAY) {
    // Verificar si el usuario puede usar predicciones futuras
    const futurePredictionData = await FuturePredictions.findOne({
      where: { user_id: userId },
      order: [['future_date', 'ASC']]  // Tomar la predicción de la fecha futura más cercana
    });

    if (futurePredictionData && futurePredictionData.predictions_taken < MAX_FUTURE_PREDICTIONS) {
      const futureDate = futurePredictionData.future_date;
      const differenceInDays = Math.floor((new Date(futureDate).getTime() - new Date(today).getTime()) / (1000 * 3600 * 24));

      // Verificar que la predicción futura esté dentro del límite de 5 días
      if (differenceInDays > MAX_DAYS_IN_FUTURE) {
        return HttpResponse.BAD_REQUEST_ERROR(res, `Solo puedes usar predicciones hasta 5 días en el futuro. El día seleccionado está a ${differenceInDays} días.`);
      }

      // Actualizar la predicción futura tomada
      await futurePredictionData.update({
        predictions_taken: futurePredictionData.predictions_taken + 1,
      });

      console.log(`Se ha usado una predicción del día futuro ${futureDate}.`);
      return true;  // El usuario ha podido usar una predicción futura
    } else {
      return HttpResponse.BAD_REQUEST_ERROR(res, "Has alcanzado el límite de predicciones diarias y no puedes usar más predicciones futuras.");
    }
  }

  // Si el usuario aún no ha alcanzado el límite diario
  if (todayPredictions) {
    await todayPredictions.update({
      predictions_used: todayPredictions.predictions_used + 1,
    });
  } else {
    // Crear un registro de predicciones para hoy si no existe
    const firstPrediction: any = {
        user_id: userId,
        date: today,
        predictions_used: 1, // Primera predicción del día
      }
      await UserPredictions.create(firstPrediction);
  }

  return true;  // El usuario puede crear una predicción
};
