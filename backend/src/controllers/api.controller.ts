import { Request, Response } from "express";
import dotenv from "dotenv";
import {
  getAllMatches,
  getCountries,
  getLeague,
  getMatch,
  getPlayer,
  getPOnePlayer,
  getRecords,
  getTeam,
} from "../services/api.service";
import { httpResponse } from "../utils/enumsErrors";


const HttpResponse = new httpResponse();
dotenv.config();

export const getMatchApi = async (req: Request, res: Response) => {
  try {
    const { from, to, match_id, league } = req.query;

    const result = await getMatch(from, to, match_id, league);
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

export const getAllMatchesApi = async (req: Request, res: Response) => {
  try {
    const from = req.query.from as any | undefined;
    const to = req.query.to as any | undefined;
    const { match_id, league } = req.query
    const matches = await getAllMatches(from, to, match_id, league);
    if (!matches) {
      return HttpResponse.INVALID_TYPE_ERROR(
        res,
        `Error fetching data: Matches not found`
      );
    }

    return HttpResponse.OK(res, matches);
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

export const getOnePlayerApi = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const result = await getPOnePlayer(name);

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
