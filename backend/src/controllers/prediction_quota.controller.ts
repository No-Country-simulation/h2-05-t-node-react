import { getPredictionQuota } from "../services/prediction_quota.service";
import { httpResponse } from "../utils/enumsErrors";
import { Request, Response } from "express";

const HttpResponse = new httpResponse();

export const getPredictionQuotaByDate = async (req: Request, res: Response) => {
    try {
        const data = req.body;
      const predictionQuota = await getPredictionQuota(data.userId, data.date);
      if (!predictionQuota) {
        return HttpResponse.DATA_BASE_ERROR(res, "Error al obtener cuotas");
      }
      return HttpResponse.OK(res, predictionQuota);
    } catch (error) {
      return HttpResponse.Error(res, (error as Error).message);
    }
  };