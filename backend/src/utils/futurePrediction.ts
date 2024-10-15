//import { httpResponse } from "./enumsErrors";
//import { FuturePredictions } from "../models/FuturePredictions.model";
//import { Op } from "sequelize";
//import { UserPredictions } from "../models/UserPredictions.model";

/* 
const MAX_FUTURE_PREDICTIONS = 2;
const MAX_PREDICTIONS_PER_DAY = 5;

const HttpResponse = new httpResponse(); */
/**
 * Función para manejar la creación de predicciones futuras con el día específico pasado desde el front-end.
 * Se asegura de que no haya más de una predicción futura pendiente.
 */
/* export const handleFuturePrediction = async (
  userId: string,
  futureDate: string,
  res: any
) => {
  const today = new Date().toISOString().split("T")[0];

  // Verificar si el usuario ya tiene dos predicciones futuras pendientes
  const futurePredictionsPending = await FuturePredictions.findAll({
    where: {
      user_id: userId,
      predictions_taken: { [Op.gt]: 0 }, // Buscar si tiene predicciones futuras no descontadas
    },
  });

  // Si ya tiene dos predicciones pendientes, no puede usar más predicciones futuras
  if (futurePredictionsPending.length >= 2) {
    return HttpResponse.BAD_REQUEST_ERROR(
      res,
      "No puedes usar predicciones futuras hasta que se descuenten las usadas previamente."
    );
  }

  // Verificar que el día futuro no sea anterior a hoy
  if (new Date(futureDate) <= new Date(today)) {
    return HttpResponse.BAD_REQUEST_ERROR(
      res,
      "La fecha de la predicción futura no puede ser hoy o una fecha pasada."
    );
  }

  // Verificar si ya hay predicciones para el día futuro seleccionado
  const existingFuturePrediction = await FuturePredictions.findOne({
    where: {
      user_id: userId,
      future_date: futureDate,
    },
  });

  // Si ya existe un registro para ese día futuro y ya alcanzó el límite de predicciones, retornar un error
  if (
    existingFuturePrediction &&
    existingFuturePrediction.predictions_taken >= MAX_FUTURE_PREDICTIONS
  ) {
    return HttpResponse.BAD_REQUEST_ERROR(
      res,
      "Ya has alcanzado el límite de predicciones para ese día futuro."
    );
  }

  // Si ya existe el registro, actualizar las predicciones tomadas; de lo contrario, crear un nuevo registro
  if (existingFuturePrediction) {
    await existingFuturePrediction.update({
      predictions_taken: existingFuturePrediction.predictions_taken + 1,
    });
  } else {
    const data: any = {
      user_id: userId,
      future_date: futureDate,
      predictions_taken: 1, // Primera predicción tomada de ese día futuro
    };
    await FuturePredictions.create(data);
  }

  console.log(`Se ha usado una predicción para el día futuro ${futureDate}.`);
  return HttpResponse.OK(
    res,
    `Se ha utilizado una predicción futura para el día ${futureDate}`
  );
};


export const adjustFuturePredictionsIfNeeded = async (userId: string) => {
    const today = new Date().toISOString().split('T')[0];  // Fecha de hoy
  
    // Verificar si el usuario tiene predicciones futuras pendientes para hoy
    const futurePrediction = await FuturePredictions.findOne({
      where: {
        user_id: userId,
        future_date: today,  // Verificar si el día futuro es hoy
      }
    });
  
    // Si hay predicciones futuras pendientes para hoy
    if (futurePrediction && futurePrediction.predictions_taken > 0) {
      const adjustedPredictions = MAX_PREDICTIONS_PER_DAY - futurePrediction.predictions_taken;
  
      // Actualizar el registro de predicciones para hoy, si ya existe
      const todayPredictions = await UserPredictions.findOne({
        where: { user_id: userId, date: today }
      });
  
      if (todayPredictions) {
        await todayPredictions.update({
          predictions_used: Math.max(0, adjustedPredictions),  // Restar las predicciones tomadas anticipadamente
        });
      } else {
        const data: any = {
            user_id: userId,
            date: today,
            predictions_used: Math.max(0, adjustedPredictions),
          }
        // Crear un registro para hoy con las predicciones ya ajustadas
        await UserPredictions.create(data);
      }
  
      // Eliminar el registro de predicciones futuras después de ajustarlas
      await FuturePredictions.destroy({
        where: { user_id: userId, future_date: today },
      });
  
      console.log(`Se han ajustado las predicciones para hoy. Se descontaron ${futurePrediction.predictions_taken} predicciones tomadas de días futuros.`);
      return true;  // Ajuste realizado
    }
  
    console.log('No hay predicciones futuras pendientes para ajustar.');
    return false;  // No se necesitó ajuste
  };
 */