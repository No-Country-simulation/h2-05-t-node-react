import dotenv from "dotenv";

dotenv.config();

export const getMatch = async (from: any, to: any, league: any) => {
  try {
    const baseUrl = process.env.API_URL;
    const url = `${baseUrl}get_predictions&from=${from}&to=${to}&APIkey=${
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
  to: any,
  league: any,
  team_a: any,
  team_b: any
) => {
  try {
    const baseUrl = process.env.API_URL;
    const url = `${baseUrl}get_predictions&from=2022-05-10&to=${to}&APIkey=${
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

export const getCountries = async () => {
  try {
    const baseUrl = process.env.API_URL;
    const url = `${baseUrl}get_countries&APIkey=${process.env.API_KEY_APIFOOTBALL}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Error al obtener el usuario: ${(error as Error).message}`);
  }
};

export const getLeague = async (id:any) => {
  try {
    const baseUrl = process.env.API_URL;
    const url = `${baseUrl}get_leagues&country_id=${id}&APIkey=${process.env.API_KEY_APIFOOTBALL}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Error al obtener el usuario: ${(error as Error).message}`);
  }
}

export const getTeam = async (id:any) => {
  try {
    const baseUrl = process.env.API_URL;
    const url = `${baseUrl}get_teams&league_id=${id}&APIkey=${process.env.API_KEY_APIFOOTBALL}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    const filteredResults = result.map((item:any)=>({
      team_id: item.team_key,
      team_name: item.team_name,
      team_country: item.team_country,
      team_logo: item.team_badge
    }))
    return filteredResults;
  } catch (error) {
    throw new Error(`Error al obtener el usuario: ${(error as Error).message}`);
  }
}

export const getPlayer = async (id:any, tid:any) => {
  try {
    const baseUrl = process.env.API_URL;
    const url = `${baseUrl}get_teams&league_id=${id}&team_id=${tid}&APIkey=${process.env.API_KEY_APIFOOTBALL}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    const filteredResults = result.map((item:any)=>({
      teram_players: {
        player_name: item.players.player_name,
        player_image: item.players.player_image,
        player_number: item.players.player_number,
        player_type: item.players.player_type,
        player_age: item.players.player_age,
        player_goals: item.players.player_goals,
        player_assists: item.players.player_assists,
        player_red_cards: item.players.player_red_cards
      }
      
    }))
    return filteredResults;
  } catch (error) {
    throw new Error(`Error al obtener el usuario: ${(error as Error).message}`);
  }
}