import { Prediction } from "../models/prediction.model";
import { PredictionRecord } from "../models/predictionRecord.model";
//import { Ranking } from "../models/ranking.model";
import { addPoints } from "./ranking.service";
import { PredictionInfo } from "../models/prediction_info.model";
import { calculateChainedPoints } from "../utils/pointCalculation";

import { getPredictionQuota } from "./predictionQuota.service";

import sequelize from "../config/database";

export const getPredictions = async (): Promise<Prediction[]> => {
  try {
    const prediction = await Prediction.findAll();
    if (!prediction) throw new Error("Predicciones no encontrados");
    return prediction;
  } catch (error) {
    throw new Error(
      `Error al obtener las Predicciones: ${(error as Error).message}`
    );
  }
};

export const getPrediction = async (id: any): Promise<Prediction> => {
  try {
    const prediction = await Prediction.findOne(id);
    if (!prediction) throw new Error("Predicción no encontrados");
    return prediction;
  } catch (error) {
    throw new Error(
      `Error al obtener las Predicciones: ${(error as Error).message}`
    );
  }
};

export const createPrediction = async (
  userId: string,
  prediction: {
    match_id: string;
    predictionType: "match" | "player";
    selectedPredictionType: string;
    fee: number;
    quotaType: "daily" | "future";
    date: Date;
  },
  type: "simple" | "chained",
  predictionId?: string
) => {
  const transaction = await sequelize.transaction();
  try {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0]; // Formatear la fecha en 'YYYY-MM-DD'

    // Verificar cuántas predicciones disponibles tiene el usuario para hoy
    let predictionQuota = await getPredictionQuota(userId, todayString);

    // Validar existencia de `predictionQuota`
    if (!predictionQuota)
      throw new Error("No se pudo obtener la cuota de predicciones.");

    // Validar límites de predicciones
    if (
      (prediction.quotaType === "daily" &&
        predictionQuota.daily_predictions_left === 0) ||
      (prediction.quotaType === "future" &&
        predictionQuota.future_predictions_left === 0)
    ) {
      throw new Error(
        `No tienes suficientes predicciones ${
          prediction.quotaType === "daily" ? "diarias" : "futuras"
        } disponibles.`
      );
    }
    let newPrediction;
    let totalPoints = prediction.fee;
    //Si el usuario ya tiene predicciones llega con id sino llega null
    let predId = predictionId || null;

    if (type === "simple") {
      // Crear la predicción principal y el registro en una sola transacción
      newPrediction = await Prediction.create(
        {
          user_id: userId,
          type: type,
          total_points: totalPoints,
        },
        { transaction }
      );

      // Crear el registro de predicción

      await PredictionRecord.create(
        {
          user_id: userId,
          prediction_id: newPrediction.id,
        },
        { transaction }
      );

      // Crear PredictionInfo con su relacion
      const newPredictionInfo = await PredictionInfo.create(
        {
          match_id: prediction.match_id,
          prediction_id: newPrediction.id, // Relacionar con la predicción creada
          predictionType: prediction.predictionType,
          predictionQuotaType: prediction.quotaType,
          selectedPredictionType: prediction.selectedPredictionType,
          fee: prediction.fee,
          prediction_date: prediction.date,
        },
        { transaction }
      );

      await predictionQuota.update(
        {
          daily_predictions_left:
            prediction.quotaType === "daily"
              ? predictionQuota.daily_predictions_left - 1
              : predictionQuota.daily_predictions_left,
          future_predictions_left:
            prediction.quotaType === "future"
              ? predictionQuota.future_predictions_left - 1
              : predictionQuota.future_predictions_left,
        },
        { transaction }
      );

      await transaction.commit();

      return {
        predicInfoId: newPredictionInfo.id,
        msg: "Has creado la predicciones simple con éxito.",
      };
    } else if (type === "chained") {
      if (!predictionId) {
        // Crear la predicción principal y el registro en una sola transacción
        const newPrediction = await Prediction.create(
          {
            user_id: userId,
            type: type,
            total_points: 0,
          },
          { transaction }
        );
        // Crear el registro de predicción
        await PredictionRecord.create(
          {
            user_id: userId,
            prediction_id: newPrediction.id,
          },
          { transaction }
        );
        // Guardar el id de la predicción para Relacionar con la predicción creada
        predId = newPrediction.id;
      }

      // Crear PredictionInfo con su relacion
       await PredictionInfo.create(
        {
          match_id: prediction.match_id,
          prediction_id: predId as string, // Relacionar con la predicción creada
          predictionType: prediction.predictionType,
          predictionQuotaType: prediction.quotaType,
          selectedPredictionType: prediction.selectedPredictionType,
          fee: prediction.fee,
          prediction_date: prediction.date,
        },
        { transaction }
      );

      const newPrediction = await Prediction.findByPk(predId as string);
      totalPoints = await calculateChainedPoints(predId as string);

      if (newPrediction) {
        await newPrediction.update(
          { total_points: totalPoints },
          { transaction }
        );
      }
    
      await predictionQuota.update(
        {
          daily_predictions_left:
            prediction.quotaType === "daily"
              ? predictionQuota.daily_predictions_left - 1
              : predictionQuota.daily_predictions_left,
          future_predictions_left:
            prediction.quotaType === "future"
              ? predictionQuota.future_predictions_left - 1
              : predictionQuota.future_predictions_left,
        },
        { transaction }
      );

      await transaction.commit();

      return {
        predId,
        msg: "Has creado la predicciones chained con éxito.",
      };
    }
  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear la predicciones:", error);
    throw new Error(
      `Error al crear la prediccion: ${(error as Error).message}`
    );
  }
};

export const deletePrediction = async (id: any) => {
  try {
    const prediction = await Prediction.destroy({ where: { id: id } });
    if (!prediction) throw new Error("Predicción no eliminada");
    return { msg: "Predicción eliminada" };
  } catch (error) {
    throw new Error(
      `Error al eliminar la Predicción: ${(error as Error).message}`
    );
  }
};

export const updatePrediction = async (
  id: string,
  updateData: any
): Promise<any> => {
  try {
    const prediction = await Prediction.findByPk(id);

    if (!prediction) {
      throw new Error("Predicción no encontrada");
    }

    // Guardar el estado anterior para comparar
    const previousStatus = prediction.status;

    // Actualizar los datos de la predicción
    await prediction.update(updateData);

    // Verificar si la predicción ha cambiado a "win" cambiar por el estada usado
    if (updateData.status === "win" && previousStatus !== "win") {
      const point = addPoints(id, prediction.total_points);
      if (!point) {
        throw new Error("No se pudo añadir los puntos a la clasificación");
      }
    }
    // Actualizar registro en el historial de predicciones
    const predictionRecord = await PredictionRecord.findOne({
      where: { prediction_id: id },
    });

    if (predictionRecord) {
      // Si existe, actualizar los datos del registro
      await predictionRecord.update(updateData);
    } else {
      // Si no existe, crear un nuevo registro (para casos donde no haya historial previo)
      await PredictionRecord.create({
        prediction_id: id,
        ...updateData,
        timestamp: new Date(),
      });
    }
    return { msg: "Predicción actualizado" };
  } catch (error) {
    throw new Error(
      `Error al actualizado la Predicción: ${(error as Error).message}`
    );
  }
};
