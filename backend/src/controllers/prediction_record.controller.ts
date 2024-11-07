//import { HistoryFilterOptions } from "../interfaces/prediction.interface";
import { predictionHistoryByUser } from "../services/prediction_record.service";
import { httpResponse } from "../utils/enumsErrors";
import { Request, Response } from "express";

const HttpResponse = new httpResponse();

export const getPredictionHistoryByUser = async (
  req: Request,
  res: Response
) => {
  try {
    const data = req.body;

    console.log("id----------------------------------", data.userId);
    const historyPrediction = await predictionHistoryByUser(data.userId, data.filters);

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
