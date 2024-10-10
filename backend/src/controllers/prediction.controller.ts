import { matchInterface } from "../interfaces/match.interface";
import { predictionInterface } from "../interfaces/prediction.interface";
import { predictionInfo } from "../interfaces/predictionInfo.interface";
import { PredictionInfo } from "../models/prediction_info.model";
import { CreateOneMatch } from "../services/match.service";
import {
  createPrediction,
  deletePrediction,
  getPrediction,
  getPredictions,
  updatePrediction,
} from "../services/prediction.service";
import { httpResponse } from "../utils/enumsErrors";
import { Request, Response } from "express";

const HttpResponse = new httpResponse();

export const getAllPredictions = async (req: Request, res: Response) => {
  try {
    const prediction = await getPredictions();
    if (!prediction) {
      return HttpResponse.DATA_BASE_ERROR(res, "Predicciones no encontradas");
    }
    return HttpResponse.OK(res, prediction);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const getOnePrediction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const prediction = await getPrediction(id);
    if (!prediction) {
      return HttpResponse.DATA_BASE_ERROR(res, "Predicción no encontrada");
    }
    return HttpResponse.OK(res, prediction);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const createOnePrediction = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    //crear prediccion
    const dataPrediction: predictionInterface = {
      user_id: data.user_id,
      type: data.type,
      date: data.date,
      status: data.status,
    };
    const prediction = await createPrediction(dataPrediction);
    if (!prediction) {
      return HttpResponse.DATA_BASE_ERROR(res, "Error al cargar datos");
    }
    //Crear partido
    const dataMatch: matchInterface = {
      team_a: data.team_a,
      team_b: data.team_b,
      match_date: data.match_date,
      status: data.status,
      id_apiMatch: data.id_apiMatch,
      league_id: data.league_id
    }
    const match = await CreateOneMatch(dataMatch);
    if (!match) {
      return HttpResponse.DATA_BASE_ERROR(res, "Error al cargar datos");
    }
    //Crear la informacion de la prediccion
    const dataPredictionInfo: predictionInfo = {
      match_id: match.id,
      prediction_id: prediction.id,
      prediction: data.prediction,
      fee: data.fee,
      prediction_date: data.date,
      status: data.status
    }
    const predictionInfo = await PredictionInfo.create(dataPredictionInfo);
    if (!predictionInfo) {
      return HttpResponse.DATA_BASE_ERROR(res, "Error al cargar datos");
    }
    return HttpResponse.OK(res, {match: match, prediction: prediction, prediction_info: predictionInfo  });
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
    if (!prediction) {
      return HttpResponse.DATA_BASE_ERROR(res, "Error al actualizar predición");
    }
    return HttpResponse.OK(res, prediction);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};
