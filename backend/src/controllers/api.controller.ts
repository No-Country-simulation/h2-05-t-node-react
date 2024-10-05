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

dotenv.config();

export const getMatchApi = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { from, to, league } = req.query;

    const result = await getMatch(from, to, league);
    if (!result) {
      res
        .status(result.status)
        .send(`Error fetching data: ${result.statusText}`);
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching API data:", error);
    res.status(500).send("Error fetching API data.");
  }
};

export const getRecord = async (req: Request, res: Response): Promise<void> => {
  try {
    const { to, league, team_a, team_b } = req.query;

    const result = await getRecords(to, league, team_a, team_b);

    if (!result) {
      res
        .status(result.status)
        .send(`Error fetching data: ${result.statusText}`);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching API data:", error);
    res.status(500).send("Error fetching API data.");
  }
};

export const getCountriesApi = async (req: Request, res: Response) => {
  try {
    const result = await getCountries();
    if (!result) {
      res
        .status(result.status)
        .send(`Error fetching data: ${result.statusText}`);
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching API data:", error);
    res.status(500).send("Error fetching API data.");
  }
};

export const getLeagueApi = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const result = await getLeague(id);
    if (!result) {
      res
        .status(result.status)
        .send(`Error fetching data: ${result.statusText}`);
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching API data:", error);
    res.status(500).send("Error fetching API data.");
  }
};

export const getTeamApi = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;
    const result = await getTeam(id);
    if (!result) {
      res
        .status(result.status)
        .send(`Error fetching data: ${result.statusText}`);
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching API data:", error);
    res.status(500).send("Error fetching API data.");
  }
};

export const getPlayerApi = async (req: Request, res: Response) => {
  try {
    const { id, tid } = req.query;
    const result = await getPlayer(id, tid);

    if (!result) {
      res
        .status(result.status)
        .send(`Error fetching data: ${result.statusText}`);
      return;
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching API data:", error);
    res.status(500).send("Error fetching API data.");
  }
};
