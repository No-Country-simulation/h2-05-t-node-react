import { Request, Response } from "express";
import dotenv from "dotenv";
import { getMatch, getRecords } from "../services/api.service";

dotenv.config();

export const getApi = async (req: Request, res: Response): Promise<void> => {
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
    const { from, to, league, team_a, team_b } = req.query;

    const result = await getRecords(from, to, league, team_a, team_b)

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
