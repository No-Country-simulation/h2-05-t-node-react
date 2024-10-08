import { predictionInterface } from "../interfaces/prediction.interface";
import {
  createPrediction,
  deletePrediction,
  getOnePrediction,
  getPredictions,
  updatePrediction,
} from "../services/prediction.service";
import { httpResponse } from "../utils/enumsErrors";
import { Request, Response } from "express";

const HttpResponse = new httpResponse();

export const getAllPredictions = async (req: Request, res: Response) => {
  try {
    const prediction = await getPredictions();
    if (!prediction)
      return HttpResponse.DATA_BASE_ERROR(res, "Predicciones no encontradas");
    return HttpResponse.OK(res, prediction);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const getPrediction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const prediction = await getOnePrediction(id);
    if (!prediction)
      return HttpResponse.DATA_BASE_ERROR(res, "Predicción no encontrada");
    return HttpResponse.OK(res, prediction);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const createOnePrediction = async (req: Request, res: Response) => {
  try {
    const data = req.body as predictionInterface;
    const prediction = await createPrediction(data);
    if (!prediction)
      return HttpResponse.DATA_BASE_ERROR(res, "Error al cargar datos");
    return HttpResponse.OK(res, prediction);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const deleteOnePrediction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const prediction = await deletePrediction(id);
    if (!prediction)
      return HttpResponse.DATA_BASE_ERROR(res, "Error al eliminar predición");
    return HttpResponse.OK(res, prediction);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const updateOnePrediction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const prediction = await updatePrediction(id, data);
    if (!prediction)
      return HttpResponse.DATA_BASE_ERROR(res, "Error al actualizar predición");
    return HttpResponse.OK(res, prediction);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};
