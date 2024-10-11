import { HistoryFilterOptions } from "../interfaces/prediction.interface";
import { predictionHistoryByUser } from "../services/predictionRecord.service";
import { httpResponse } from "../utils/enumsErrors";
import { Request, Response } from "express";

const HttpResponse = new httpResponse();

export const getPredictionHistoryByUser = async (
  req: Request,
  res: Response
) => {
  try {
    const filters = req.body.filters as HistoryFilterOptions;
    const userId = req.body.id as string;

    const historyPrediction = await predictionHistoryByUser(userId, filters);

    if (!historyPrediction)
      return HttpResponse.DATA_BASE_ERROR(
        res,
        "Historial de Predicciones Vacío"
      );

    return HttpResponse.OK(res, historyPrediction);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};
