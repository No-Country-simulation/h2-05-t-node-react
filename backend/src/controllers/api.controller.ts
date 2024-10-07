import { Request, Response } from "express";
import dotenv from "dotenv";
import {
  getCountries,
  getLeague,
  getMatch,
  getPlayer,
  getRecords,
  getTeam,
} from "../services/api.service";
import { httpResponse } from "../utils/enumsErrors";

const HttpResponse = new httpResponse();
dotenv.config();

export const getMatchApi = async (
  req: Request,
  res: Response
) => {
  try {
    const { from, to, league } = req.query;

    const result = await getMatch(from, to, league);
    if (!result) {
      return HttpResponse.INVALID_TYPE_ERROR(
        res,
        `Error fetching data: ${result.statusText}`
      );
    }
    return HttpResponse.OK(res, result);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const getRecord = async (req: Request, res: Response) => {
  try {
    const { to, league, team_a, team_b } = req.query;

    const result = await getRecords(to, league, team_a, team_b);

    if (!result) {
      return HttpResponse.INVALID_TYPE_ERROR(
        res,
        `Error fetching data: ${result.statusText}`
      );
    }

    return HttpResponse.OK(res, result);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const getCountriesApi = async (req: Request, res: Response) => {
  try {
    const result = await getCountries();
    if (!result) {
      return HttpResponse.INVALID_TYPE_ERROR(
        res,
        `Error fetching data: ${result.statusText}`
      );
    }
    return HttpResponse.OK(res, result);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const getLeagueApi = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const result = await getLeague(id);
    if (!result) {
      return HttpResponse.INVALID_TYPE_ERROR(
        res,
        `Error fetching data: ${result.statusText}`
      );
    }
    return HttpResponse.OK(res, result);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const getTeamApi = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const result = await getTeam(id);
    if (!result) {
      return HttpResponse.INVALID_TYPE_ERROR(
        res,
        `Error fetching data: ${result.statusText}`
      );
    }
    return HttpResponse.OK(res, result);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const getPlayerApi = async (req: Request, res: Response) => {
  try {
    const { id, tid } = req.query;
    const result = await getPlayer(id, tid);

    if (!result) {
      return HttpResponse.INVALID_TYPE_ERROR(
        res,
        `Error fetching data: ${result.statusText}`
      );
    }
    return HttpResponse.OK(res, result);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};
