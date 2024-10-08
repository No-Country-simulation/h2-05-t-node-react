import { Prediction } from "../models/prediction.model";
import { predictionRecord } from "../models/predictionRecord.model";

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

export const getOnePrediction = async (id: any): Promise<Prediction> => {
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

export const createPrediction = async (data: any): Promise<any> => {
  try {
    const prediction = await Prediction.create(data);
    if (!prediction) throw new Error("Predicción no creado");
    if (!prediction.user_id || !prediction.id) {
      throw new Error("Datos faltantes para crear el registro de la predicción.");
    }
    const dataRecord: any = {
      user_id: prediction.user_id,
      prediction_id: prediction.id,
    };
    const predRecord = await predictionRecord.create(dataRecord);
    if (!predRecord) throw new Error("Registro no creado");
    return { msg: "Predicción creado" };
  } catch (error) {
    throw new Error(
      `Error al obtener las Predicciones: ${(error as Error).message}`
    );
  }
};

export const deletePrediction = async (id: any) => {
  try {
    const prediction = await Prediction.destroy({ where: { id: id } });
    if (!prediction) throw new Error("Predicción no creado");
    return { msg: "Predicción creado" };
  } catch (error) {
    throw new Error(
      `Error al obtener la Predicción: ${(error as Error).message}`
    );
  }
};

export const updatePrediction = async (id: any, data: any): Promise<any> => {
  try {
    const prediction = await Prediction.update(data, { where: { id: id } });
    if (!prediction) throw new Error("Predicción no actualizado");
    return { msg: "Predicción actualizado" };
  } catch (error) {
    throw new Error(
      `Error al eliminar la Predicción: ${(error as Error).message}`
    );
  }
};
