import { httpResponse } from "../utils/enumsErrors";
import { matchInterface } from "../interfaces/match.interface";
import { Request, Response } from "express";
import {
  CreateOneMatch,
  deleteOneMatch,
  getMatchById,
  getMatches,
  updateOneMatch,
} from "../services/match.service";

const HttpResponse = new httpResponse();

export const getAllMatches = async (req: Request, res: Response) => {
  try {
    const match = await getMatches();
    if (!match) {
      return HttpResponse.DATA_BASE_ERROR(res, "Partidos no encontradas");
    }
    return HttpResponse.OK(res, match);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const getOneMatch = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const match = await getMatchById(id);
    if (!match) {
      return HttpResponse.DATA_BASE_ERROR(res, "Partido no encontrada");
    }
    return HttpResponse.OK(res, match);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};
export const createMatch = async (req: Request, res: Response) => {
  try {
    const data = req.body as matchInterface;
    const match = await CreateOneMatch(data);
    if (!match) {
      return HttpResponse.DATA_BASE_ERROR(res, "Partido no creado");
    }
    return HttpResponse.OK(res, match);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const deleteMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const match = await deleteOneMatch(id);
    if (!match) {
      return HttpResponse.DATA_BASE_ERROR(res, "Partido no eliminado");
    }
    return HttpResponse.OK(res, match);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const updateMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const match = await updateOneMatch(id, data);
    if (!match) {
      return HttpResponse.DATA_BASE_ERROR(res, "Partido no actualizado");
    }
    return HttpResponse.OK(res, match);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};
