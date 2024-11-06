import dotenv from "dotenv";
import { API_URL } from "../config/enviroment";

dotenv.config();

export const getAllMatches = async (
  from: any,
  to: any,
  match_id: any,
  league: any
) => {
  try {
    const baseUrl = process.env.API_URL;
    let url: any;
    if (league) {
      url = `${baseUrl}get_events&from=${from}&to=${to}&APIkey=${
        process.env.API_KEY_APIFOOTBALL || ""
      }&league_id=${league}`;
    } else if (match_id) {
      url = `${baseUrl}get_events&from=${from}&to=${to}&APIkey=${
        process.env.API_KEY_APIFOOTBALL || ""
      }&match_id=${match_id}`;
    } else {
      url = `${baseUrl}get_events&from=${from}&to=${to}&APIkey=${
        process.env.API_KEY_APIFOOTBALL || ""
      }`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response) throw new Error("Error al obtener datos");

    const result = await response.json();
    if (result.length === 0) {
      return { msg: "No hay partidos" };
    }
    const filteredResults = result.map((item: any) => ({
      league_name: item.league_name,
      league_id: item.league_id,
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
      team_home_badge: item.team_home_badge,
      team_away_badge: item.team_away_badge,
      match_status: item.match_status,
      goalscorer: item.goalscorer,
    }));

    return filteredResults;
  } catch (error) {
    throw new Error(
      `Error al obtener el la informacion: ${(error as Error).message}`
    );
  }
};

export const getMatch = async (
  from: any,
  to: any,
  match_id: any,
  league: any
) => {
  try {
    let url: any;
    const baseUrl = process.env.API_URL;
    if (league) {
      url = `${baseUrl}get_predictions&from=${from}&to=${to}&APIkey=${
        process.env.API_KEY_APIFOOTBALL || ""
      }&league_id=${league}`;
    } else if (match_id) {
      url = `${baseUrl}get_predictions&from=${from}&to=${to}&APIkey=${
        process.env.API_KEY_APIFOOTBALL || ""
      }&match_id=${match_id}`;
    } else {
      url = `${baseUrl}get_predictions&from=${from}&to=${to}&APIkey=${
        process.env.API_KEY_APIFOOTBALL || ""
      }`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response) throw new Error("Error al obtener datos");

    const result = await response.json();
    if (result.length === 0) {
      return { msg: "No hay partidos" };
    }
    const filteredResults = result.map((item: any) => ({
      country_name: item.country_name,
      country_id: item.country_id,
      league_id: item.league_id,
      league_name: item.league_name,
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
      match_status: item.match_status,
    }));

    return filteredResults;
  } catch (error) {
    throw new Error(
      `Error al obtener el la informacion: ${(error as Error).message}`
    );
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
      country_name: item.country_name,
      country_id: item.country_id,
      league_id: item.league_id,
      league_name: item.league_name,
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
    throw new Error(
      `Error al obtener el la informacion: ${(error as Error).message}`
    );
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
    throw new Error(
      `Error al obtener el la informacion: ${(error as Error).message}`
    );
  }
};

export const getLeague = async (id: any) => {
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
    throw new Error(
      `Error al obtener el la informacion: ${(error as Error).message}`
    );
  }
};

export const getTeam = async (id: any) => {
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

    const filteredResults = result.map((item: any) => ({
      team_id: item.team_key,
      team_name: item.team_name,
      team_country: item.team_country,
      team_logo: item.team_badge,
    }));
    return filteredResults;
  } catch (error) {
    throw new Error(
      `Error al obtener el la informacion: ${(error as Error).message}`
    );
  }
};

export const getPlayer = async (id: any, tid: any) => {
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
    const filteredResults = result.map((item: any) => ({
      team_players: item.players.map((player: any) => ({
        player_name: player.player_name,
        player_image: player.player_image,
        player_number: player.player_number,
        player_type: player.player_type,
        player_age: player.player_age,
        player_goals: player.player_goals,
        player_assists: player.player_assists,
        player_red_cards: player.player_red_cards,
      })),
    }));
    return filteredResults;
  } catch (error) {
    throw new Error(
      `Error al obtener el la informacion: ${(error as Error).message}`
    );
  }
};

export const getPOnePlayer = async (name: any) => {
  try {
    const baseUrl = process.env.API_URL;
    const url = `${baseUrl}get_players&player_name=${name}&APIkey=${process.env.API_KEY_APIFOOTBALL}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    const filteredResults = result.map((item: any) => ({
      player_id: item.player_key,
      player_name: item.player_name,
      player_country: item.player_country,
      player_image: item.player_image,
      player_number: item.player_number,
      player_type: item.player_type,
      player_age: item.player_age,
      player_goals: item.player_goals,
      player_team: item.team_name,
      player_rating: item.player_rating,
    }));
    return filteredResults;
  } catch (error) {
    throw new Error(
      `Error al obtener el la informacion: ${(error as Error).message}`
    );
  }
};

export const getPlayerByName = async (name: any) => {
  try {
    const apiUrl = API_URL;
    const url = `${apiUrl}players/profiles?search=${name}`;
    const apiKey = process.env.API_KEY_APIFOOTBALL;

    const respuesta = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": `${apiKey}`,
      },
    });

    const result = await respuesta.json();
    //Se da formato de la respuesta
    const players = result.response.map((item: any) => ({
      apiId: item.player.id,
      name: item.player.name,
      firstname: item.player.firstname
        ? item.player.firstname
        : "No hay datos ingresados en la api",
      lastname: item.player.lastname
        ? item.player.lastname
        : "No hay datos ingresados en la api",
      age: item.player.age
        ? item.player.age
        : "No hay datos ingresados en la api",
      photo: item.player.photo
        ? item.player.photo
        : "No hay datos ingresados en la api",
      position: item.player.position
        ? item.player.position
        : "No hay datos ingresados en la api",
      nationality: item.player.nationality
        ? item.player.nationality
        : "No hay datos ingresados en la api",
    }));

    return players;
  } catch (error) {
    throw new Error(`Error al buscar el jugador: ${(error as Error).message}`);
  }
};

export const getPlayerSeasonById = async (id: any) => {
  try {
    const apiUrl = API_URL;
    const url = `${apiUrl}players/seasons?player=${id}`;
    const apiKey = process.env.API_KEY_APIFOOTBALL;

    const respuesta = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": `${apiKey}`,
      },
    });

    const result = await respuesta.json();
    //Se da formato de la respuesta
    const player = result.response;

    return player;
  } catch (error) {
    throw new Error(`Error al buscar el jugador: ${(error as Error).message}`);
  }
};

export const getPlayerByIdAndSeason = async (id: any, season: any) => {
  try {
    const apiUrl = API_URL;
    const url = `${apiUrl}players?id=${id}&season=${season}`;
    const apiKey = process.env.API_KEY_APIFOOTBALL;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": `${apiKey}`,
      },
    });

    const result = await response.json();
    console.log("Response:", result.response);

    // Process and map the response
    const players = result.response.map((item: any) => {
      const { player, statistics } = item;

      // Aggregate statistics
      const aggregatedStats = statistics.reduce(
        (acc: any, stat: any) => {
          acc.goals += stat.goals.total || 0;
          acc.assists_goals += stat.goals.assists || 0;
          acc.games += stat.games.appearences || 0;
          acc.minutes_played += stat.games.minutes || 0;
          acc.cards_yellow += stat.cards.yellow || 0;
          acc.cards_red += stat.cards.red || 0;
          return acc;
        },
        {
          goals: 0,
          assists_goals: 0,
          games: 0,
          minutes_played: 0,
          cards_yellow: 0,
          cards_red: 0,
        }
      );

      // Return the final structure
      return {
        name: player.name,
        photo: player.photo,
        age: player.age,
        ...aggregatedStats,
      };
    });

    console.log("Filtered Players:", players);
    return players;
  } catch (error) {
    throw new Error(`Error al buscar el jugador: ${(error as Error).message}`);
  }
};

export const getPlayerByIdAndTotalSeason = async (id: any, seasons: any) => {
  try {
    const apiUrl = API_URL;
    const apiKey = process.env.API_KEY_APIFOOTBALL;

    if (typeof seasons === "string") {
      seasons = JSON.parse(seasons);
    }

    // Initialize the total aggregated statistics
    const totalAggregatedStats = {
      goals: 0,
      assists_goals: 0,
      games: 0,
      minutes_played: 0,
      cards_yellow: 0,
      cards_red: 0,
    };

    let playerInfo: any = null;
    console.log("Seasons:", seasons);
    // Loop through each season and fetch data
    for (const season of seasons) {
      const url = `${apiUrl}players?id=${id}&season=${season}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": `${apiKey}`,
        },
      });

      const result = await response.json();
      //console.log(`Response for season ${season}:`, result.response);

      // Process and aggregate statistics for each season
      result.response.forEach((item: any) => {
        const { player, statistics } = item;

        // Set player info once (assuming it doesn't change across seasons)
        if (!playerInfo) {
          playerInfo = {
            name: player.name,
            photo: player.photo,
            age: player.age,
          };
        }

        // Aggregate the statistics for the season
        statistics.forEach((stat: any) => {
          totalAggregatedStats.goals += stat.goals.total || 0;
          totalAggregatedStats.assists_goals += stat.goals.assists || 0;
          totalAggregatedStats.games += stat.games.appearences || 0;
          totalAggregatedStats.minutes_played += stat.games.minutes || 0;
          totalAggregatedStats.cards_yellow += stat.cards.yellow || 0;
          totalAggregatedStats.cards_red += stat.cards.red || 0;
        });
      });
    }

    // Combine player info with the total aggregated statistics
    const finalPlayerData = {
      ...playerInfo,
      ...totalAggregatedStats,
    };

    console.log("Final Player Data:", finalPlayerData);
    return finalPlayerData;
  } catch (error) {
    throw new Error(`Error al buscar el jugador: ${(error as Error).message}`);
  }
};
export const getPlayerTrophyById = async (id: any) => {
  try {
    const apiUrl = API_URL;
    const url = `${apiUrl}trophies?player=${id}`;
    const apiKey = process.env.API_KEY_APIFOOTBALL;

    const respuesta = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": `${apiKey}`,
      },
    });

    const result = await respuesta.json();
    //Se da formato de la respuesta
    const player = result.response;
    if (player.length === 0) {
      return { msg: "No hay datos de trofeos" };
    }
    return player;
  } catch (error) {
    throw new Error(`Error al buscar el jugador: ${(error as Error).message}`);
  }
};
export const postPlayerInfoToken = async (id: any) => {
  try {
    const apiUrl = API_URL;
    const url = `${apiUrl}trophies?player=${id}`;
    const apiKey = process.env.API_KEY_APIFOOTBALL;

    const respuesta = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": `${apiKey}`,
      },
    });

    const result = await respuesta.json();
    //Se da formato de la respuesta
    const player = result.response;
    if (player.length === 0) {
      return { msg: "No hay datos de trofeos" };
    }
    return player;
  } catch (error) {
    throw new Error(`Error al buscar el jugador: ${(error as Error).message}`);
  }
};
