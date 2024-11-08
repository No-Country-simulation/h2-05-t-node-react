import { Request, Response } from "express";
import dotenv from "dotenv";
import { endedMatch, getStandings, newApiLeague, newFixture, newMatchEnded, newOdds, newTeamApi } from "../services/api.service";
import { httpResponse } from "../utils/enumsErrors";

const HttpResponse = new httpResponse();
dotenv.config();

export const getAllstandings = async (req: Request, res: Response) => {
  try {
    const { id, season } = req.query;
    const result = await getStandings(id, season);
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
export const getNewFixture = async (req: Request, res: Response) => {
  try {
    const { from, to, season, league } = req.query;
    const result = await newFixture(league, season, from, to);
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

export const getNewOdds = async (req: Request, res: Response) => {
  try {
    const { fixture, season, league } = req.query;
    const result = await newOdds(league, season, fixture);
    if (!result) {
      return HttpResponse.INVALID_TYPE_ERROR(
        res,
        `Error fetching data`
      );
    }
    return HttpResponse.OK(res, result);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const getNewTeams = async (req: Request, res: Response) => {
  try {
    const { team, season, page } = req.query;
    const result = await newTeamApi(team, season, page); 
    if (!result) {
      return HttpResponse.INVALID_TYPE_ERROR(
        res,
        `Error fetching data`
      );
    }
    return HttpResponse.OK(res, result);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const getNewLeagues = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const result = await newApiLeague(search); 
    if (!result) {
      return HttpResponse.INVALID_TYPE_ERROR(
        res,
        `Error fetching data`
      );
    }
    return HttpResponse.OK(res, result);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const getNewMatchEnded = async (req: Request, res: Response) => {
  try {
    const { fixtureId } = req.query;
    const result = await newMatchEnded(fixtureId); 
    if (!result) {
      return HttpResponse.INVALID_TYPE_ERROR(
        res,
        `Error fetching data`
      );
    }
    return HttpResponse.OK(res, result);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const getEdedMatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const result = await endedMatch(id);
    if (!result) {
      return HttpResponse.INVALID_TYPE_ERROR(
        res,
        `Error fetching data`
      );
    }
    return HttpResponse.OK(res, result);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
}