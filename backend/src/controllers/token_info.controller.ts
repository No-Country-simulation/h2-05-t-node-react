import { Request, Response } from "express";
import { httpResponse } from "../utils/enumsErrors";
import { createTokenInfo, deleteTokenInfoById, getTokenInfobyId, getTokensInfos, updateTokenInfobyId } from "../services/token_info.service";


const HttpResponse = new httpResponse();

export const getAllTokenInfo = async (req: Request, res: Response) => {
  try {
    const tokensInfos = await getTokensInfos();
    if (!tokensInfos) {
      return HttpResponse.DATA_BASE_ERROR(res, "Informaciones de tokens no encontradas");
    }
    return HttpResponse.OK(res, tokensInfos);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const getTokenInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tokenInfo = await getTokenInfobyId(id);
    if (!tokenInfo) {
      return HttpResponse.DATA_BASE_ERROR(res, "Informacion de token no encontrada");
    }
    return HttpResponse.OK(res, tokenInfo);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const postCreateTokenInfo = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    
    const tokenInfo = await createTokenInfo(data.player, data.trophies);
    
    if (!tokenInfo) {
      return HttpResponse.DATA_BASE_ERROR(res, "Error al cargar datos");
    }
    return HttpResponse.OK(res, tokenInfo );

  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const deleteTokenInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tokenInfo = await deleteTokenInfoById(id);
    if (!tokenInfo)
      return HttpResponse.DATA_BASE_ERROR(res, "Error al eliminar predición");
    return HttpResponse.OK(res, tokenInfo);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const putUpdateTokenInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const tokenInfo = await updateTokenInfobyId(id, data);
    if (!tokenInfo) {
      return HttpResponse.DATA_BASE_ERROR(res, "Error al actualizar predición");
    }
    return HttpResponse.OK(res, tokenInfo);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};