import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const getApi = async (req: Request, res: Response): Promise<void> => {
  try {
    const baseUrl = process.env.API_URL;
    const { from, to, league } = req.query;

    const url = `${baseUrl}?from=${from}&to=${to}&APIkey=${
      process.env.API_KEY_APIFOOTBALL || ""
    }&league_id=${league}`;
    if (!url) {
      res.status(500).send("API URL not set in environment variables.");
      return;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      res
        .status(response.status)
        .send(`Error fetching data: ${response.statusText}`);
      return;
    }

    const result = await response.json();

    const filteredResults = result.map((item: any) => ({
      match_id: item.match_id,
      match_date: item.match_date,
      hometeam_id: item.match_hometeam_id,
      homeTeam: item.match_hometeam_name,
      awayteam_id: item.match_awayteam_id,
      awayTeam: item.match_awayteam_name,
      hometeam_score: item.match_hometeam_score,
      awayteam_score: item.match_awayteam_score,
      home_prob: item.prob_HW,
      draw_prob: item.prob_D,
      away_prob: item.prob_AW,
    }));

    res.status(200).json(filteredResults);
  } catch (error) {
    console.error("Error fetching API data:", error);
    res.status(500).send("Error fetching API data.");
  }
};

export const getRecord = async (req: Request, res: Response): Promise<void> => {
  try {
    const baseUrl = process.env.API_URL;
    const { from, to, league, team_a, team_b } = req.query;
    // Construir la URL con query parameters
    const url = `${baseUrl}?from=${from}&to=${to}&APIkey=${process.env.API_KEY_APIFOOTBALL}&league_id=${league}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      res
        .status(response.status)
        .send(`Error fetching data: ${response.statusText}`);
      return;
    }

    const result = await response.json();

    const record = result.filter((item: any) => {
      return (
        (item.match_hometeam_name === team_a &&
          item.match_awayteam_name === team_b) ||
        (item.match_hometeam_name === team_b &&
          item.match_awayteam_name === team_a)
      );
    });

    const filteredResults = record.map((item: any) => ({
      match_id: item.match_id,
      match_date: item.match_date,
      hometeam_id: item.match_hometeam_id,
      homeTeam: item.match_hometeam_name,
      awayteam_id: item.match_awayteam_id,
      awayTeam: item.match_awayteam_name,
      hometeam_score: item.match_hometeam_score,
      awayteam_score: item.match_awayteam_score,
      home_prob: item.prob_HW,
      draw_prob: item.prob_D,
      away_prob: item.prob_AW,
    }));

    res.status(200).json(filteredResults);
  } catch (error) {
    console.error("Error fetching API data:", error);
    res.status(500).send("Error fetching API data.");
  }
};
