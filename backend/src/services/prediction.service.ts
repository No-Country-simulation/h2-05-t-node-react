import { predictionInterface } from "../interfaces/prediction.interface";
import { Prediction } from "../models/prediction.model";
import { PredictionRecord } from "../models/predictionRecord.model";
import { Match } from "../models/match.model";
//import { Ranking } from "../models/ranking.model";
import { addPoints } from "./ranking.service";
import { User } from "../models/user.model";
import { PredictionInfo } from "../models/prediction_info.model";
import { calculatePoints } from "../utils/pointCalculation";
import { calculatePredictionsByDay } from "../utils/predictionByDay";
import {
  getPredictionQuota,
  updateFuturePredictionQuota,
} from "./predictionQuota.service";

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
  data: predictionInterface
): Promise<any> => {
  try {
    const prediction = await Prediction.create(data);
    if (!prediction) throw new Error("Predicción no creado");
    if (!prediction.user_id || !prediction.id) {
      throw new Error(
        "Datos faltantes para crear el registro de la predicción."
      );
    }
    const dataRecord: any = {
      user_id: prediction.user_id,
      prediction_id: prediction.id,
    };
    const predRecord = await PredictionRecord.create(dataRecord);
    if (!predRecord) throw new Error("Registro no creado");
    return prediction;
  } catch (error) {
    throw new Error(
      `Error al crear la Predicción: ${(error as Error).message}`
    );
  }
};

export const createPredictions = async (
  user: User,
  predictions: {
    match_id: string;
    predictionType: "match" | "player";
    selectedPredictionType: "win_home" | "win_away" | "draw" | "player";
    fee: number;
    quotaType: "daily" | "future";
    date: Date;
  }[],
  type: "simple" | "chained"
) => {
  try {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0]; // Formatear la fecha en 'YYYY-MM-DD'

    // Verificar cuántas predicciones disponibles tiene el usuario para hoy
    let predictionQuota = await getPredictionQuota(user, today);

    const { totalDailyPredictions, futurePredictionsByDay } =
      calculatePredictionsByDay(predictions, todayString);

    // Verificar si se exceden los límites diarios
    if (totalDailyPredictions > predictionQuota.daily_predictions_left) {
      throw new Error(
        `No tienes suficientes predicciones diarias disponibles (${predictionQuota.daily_predictions_left} restantes).`
      );
    }

    // Calcular los puntos totales basados en el tipo de predicción
    const totalPoints = calculatePoints(predictions, type);

    // Crear la predicción principal y el registro en una sola transacción
    const newPrediction = await Prediction.create({
      user_id: user.id,
      type: type,
      total_points: totalPoints,
      status: "pending",
    });

    if (!newPrediction) throw new Error("Error al crear la predicción.");

    // Crear el registro de predicción
    await PredictionRecord.create({
      user_id: user.id,
      prediction_id: newPrediction.id,
    });

    // Crear múltiples PredictionInfo en una sola operación
    const predictionInfos = predictions.map((prediction) => ({
      match_id: prediction.match_id,
      prediction_id: newPrediction.id, // Relacionar con la predicción creada
      predictionType: prediction.predictionType,
      predictionQuotaType: prediction.quotaType,
      selectedPredictionType: prediction.selectedPredictionType,
      fee: prediction.fee,
      prediction_date: prediction.date,
      status: "pending",
    }));

    await PredictionInfo.bulkCreate(predictionInfos);

    // Si la predicción es encadenada, actualizar los puntos totales
    if (type === "chained") {
      await newPrediction.update({ total_points: totalPoints });
    }

    // Actualizar las cuotas de predicción futuras
    await updateFuturePredictionQuota(user, futurePredictionsByDay);

    // Actualizar las cuotas diarias después de crear las predicciones
    await predictionQuota.update({
      daily_predictions_left:
        predictionQuota.daily_predictions_left - totalDailyPredictions,
    });

    return `Has creado ${predictionInfos.length} predicciones con éxito.`;
  } catch (error) {
    console.error("Error al crear predicciones:", error);
    throw new Error(`Error al crear predicciones: ${(error as Error).message}`);
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

export const updateBet = async (id:any, data: any) => {
  try {
    const bet = await Prediction.findOne(id);
    if(!bet){
      throw new Error('No existe la predicción')
    }
    const update = await Prediction.update(data, { where: { id: id } });
    return { data:update, msg: "Predicción actualizado" };
  } catch (error) {
    throw new Error(
      `Error al actualizado la Predicción: ${(error as Error).message}`
    );
  }
}

export const predictionRecordByMatch = async (userId:any, matchId:any) => {
  try {
    const prediction = await Prediction.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: PredictionInfo,
          attributes: [
            "predictionType",
            "predictionQuotaType",
            "selectedPredictionType",
            "prediction_date",
            "status",
          ],
          where: {
            match_id: matchId, // Filtrar por match_id en PredictionInfo
          },
          include: [
            {
              model: Match,
              attributes: [
                "team_a",
                "team_b",
                "match_date",
                "league_id",
                "result",
                "status",
              ],
            },
          ],
        },
      ],
      attributes: ["id", "total_points", "status", "type"],
     })
     if(!prediction){
      throw new Error('No existe la predicción')
    }
    return prediction;
  } catch (error) {
    throw new Error(
      `Error al obtener la Predicción: ${(error as Error).message}`
    );
  }
}