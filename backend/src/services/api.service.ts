import dotenv from "dotenv";

dotenv.config();

export const getMatch = async (from: any, to: any, league: any) => {
  try {
    const baseUrl = process.env.API_URL;
    const url = `${baseUrl}?from=${from}&to=${to}&APIkey=${
      process.env.API_KEY_APIFOOTBALL || ""
    }&league_id=${league}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response) throw new Error("Error al obtener datos");

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

    return filteredResults;
  } catch (error) {
    throw new Error(`Error al obtener el usuario: ${(error as Error).message}`);
  }
};

export const getRecords = async (
  from: any,
  to: any,
  league: any,
  team_a: any,
  team_b: any
) => {
  try {
    const baseUrl = process.env.API_URL;
    const url = `${baseUrl}?from=${from}&to=${to}&APIkey=${
      process.env.API_KEY_APIFOOTBALL || ""
    }&league_id=${league}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response) throw new Error("Error al obtener datos");

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
    return filteredResults;
  } catch (error) {
    throw new Error(`Error al obtener el usuario: ${(error as Error).message}`);
  }
};
