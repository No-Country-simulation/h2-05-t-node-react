import {
  createPrize,
  deletePrize,
  getPrize,
  getPrizeById,
  updatePrize,
} from "../services/prize.service";
import { httpResponse } from "../utils/enumsErrors";
import { Request, Response } from "express";

const HttpResponse = new httpResponse();

export const getAllPrize = async (req: Request, res: Response) => {
  try {
    const prize = await getPrize();
    if (!prize) {
      HttpResponse.DATA_BASE_ERROR(res, "Premios no encontrados");
    }
    return HttpResponse.OK(res, prize);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const getOnePrize = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const prize = await getPrizeById(id);
    if (!prize) {
      HttpResponse.DATA_BASE_ERROR(res, "Premio no encontrado");
    }
    return HttpResponse.OK(res, prize);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const createOnePrize = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const prize = await createPrize(data);
    if (!prize) {
      HttpResponse.DATA_BASE_ERROR(res, "Premio no creado");
    }
    return HttpResponse.OK(res, prize);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const deleteOnePrize = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const prize = await deletePrize(id);
    if (!prize) {
      HttpResponse.DATA_BASE_ERROR(res, "Premio no eliminado");
    }
    return HttpResponse.OK(res, prize);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const updateOnePrize = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const prize = await updatePrize(id, data);
        if (!prize) {
            HttpResponse.DATA_BASE_ERROR(res, "Premio no actualizado");
          }
          return HttpResponse.OK(res, prize);
    } catch (error) {
        return HttpResponse.Error(res, (error as Error).message);
    }
}