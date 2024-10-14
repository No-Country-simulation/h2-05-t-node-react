import { predictionInterface } from "../interfaces/prediction.interface";
import { Prediction } from "../models/prediction.model";
import { UserPredictions } from "../models/UserPredictions.model";
import { Op } from 'sequelize';
import { PredictionRecord } from "../models/predictionRecord.model";
//import { Ranking } from "../models/ranking.model";
import { addPoints } from "./ranking.service";

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
      const point=addPoints(id, prediction.total_points)
      if(!point){
        throw new Error("No se pudo añadir los puntos a la clasificación")
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

export const userOnePrediction = async (id: any): Promise<any> => {
  try {
    const today = new Date().toISOString().split('T')[0];
    console.log(today);
    

    const prediction = await UserPredictions.findAll({
      where: {
        user_id: id,
        date: {
          [Op.eq]: today
        }
      }
    });

    if (!prediction || prediction.length === 0) throw new Error("Predicción no encontrada");
    return prediction;
  } catch (error) {
    throw new Error(
      `Error al obtener la predicción: ${(error as Error).message}`
    );
  }
};