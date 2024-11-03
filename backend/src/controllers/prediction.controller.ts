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

export const postCreatePrediction = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    /*   (
      userId: string,
      predictions: {
        match_id: string;
        predictionType: "match" | "player";
        selectedPredictionType: "win_home" | "win_away" | "draw" | "player";
        fee: number;
        quotaType: "daily" | "future";
        date: Date;
      },
      type: "simple" | "chained",
      predictionId?: string ,
    ) */
    const predictions = await createPrediction(
      data.userId,
      data.prediction,
      data.type,
      data.matchData,
      data?.predictionId
    );
    if (!predictions) {
      return HttpResponse.DATA_BASE_ERROR(res, "Error al cargar datos");
    }
    return HttpResponse.OK(res, predictions );
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

/* export const userPredictions = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const prediction = await userOnePrediction(id);

    if (!prediction) {
      return HttpResponse.DATA_BASE_ERROR(res, "Error al actualizar predición");
    }
    return HttpResponse.OK(res, prediction);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

// Endpoint para usar una predicción futura con un día pasado desde el front-end
export const createFuturePrediction = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user_id;
    const futureDate = req.body.future_date; // El día futuro pasado desde el front-end
    await handleFuturePrediction(userId, futureDate, res);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};
 */
