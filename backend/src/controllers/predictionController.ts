import { httpResponse } from '../utils/enumsErrors'; // Asegúrate de que esta clase esté correctamente importada
import { Request, Response } from "express";
import {  handleFuturePrediction } from '../utils/futurePrediction';

const HttpResponse = new httpResponse();
// Endpoint para usar una predicción futura con un día pasado desde el front-end
export const createFuturePrediction = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user_id;
    const futureDate = req.body.future_date;  // El día futuro pasado desde el front-end
    await handleFuturePrediction(userId, futureDate, res);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

