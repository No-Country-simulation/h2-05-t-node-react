import dotenv from "dotenv";

dotenv.config();

export const getStandings = async (id: any, season: any) => {
  try {
    const baseUrl = process.env.NEW_API_URL;
    const url = `${baseUrl}standings?league=${id}&season=${season}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": process.env.NEW_API_KEY_APIFOOTBALL!,
      },
    });
    const result = await response.json();
    if (result.length === 0) {
      return { msg: "No hay partidos" };
    }
    const info = result.response[0].league.standings;
    const filteredResults = info.flatMap((subArray: any[]) =>
      subArray.map((item: any) => ({
        rank: item.rank,
        team: item.team,
        points: item.points,
        goalsDiff: item.goalsDiff,
      }))
    );
    return filteredResults;
  } catch (error) {
    throw new Error(
      `Error al obtener el la informacion: ${(error as Error).message}`
    );
  }
};

export const newFixture = async (
  league: any,
  season: any,
  from: any,
  to: any
) => {
  try {
    const baseUrl = process.env.NEW_API_URL;
    const url = `${baseUrl}fixtures?league=${league}&timezone=America/Argentina/Buenos_Aires&season=${season}&from=${from}&to=${to}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": process.env.NEW_API_KEY_APIFOOTBALL!,
      },
    });
    const result = await response.json();
    if (result.length === 0) {
      return { msg: "No hay partidos" };
    }
    const info = result.response;
    
    const filteredData = info.map((item: any) => ({
      fixtureId: item.fixture.id,
      referee: item.fixture.referee,
      date: item.fixture.date,
      venue: {
        id: item.fixture.venue.id,
        name: item.fixture.venue.name,
        city: item.fixture.venue.city,
      },
      status: {
        long: item.fixture.status.long,
        elapsed: item.fixture.status.elapsed,
      },
      league: {
        id: item.league.id,
        name: item.league.name,
        country: item.league.country,
        logo: item.league.logo,
        flag: item.league.flag
      },
      teams: {
        home: {
          id: item.teams.home.id,
          name: item.teams.home.name,
          logo: item.teams.home.logo,
          winner: item.teams.home.winner,
        },
        away: {
          id: item.teams.away.id,
          name: item.teams.away.name,
          logo: item.teams.away.logo,
          winner: item.teams.away.winner,
        },
      },
      goals: {
        home: item.goals.home,
        away: item.goals.away,
      },
      score: {
        halftime: {
          home: item.score.halftime.home,
          away: item.score.halftime.away,
        },
        fulltime: {
          home: item.score.fulltime.home,
          away: item.score.fulltime.away,
        },
        extratime: {
          home: item.score.extratime.home,
          away: item.score.extratime.away,
        },
        penalty: {
          home: item.score.penalty.home,
          away: item.score.penalty.away,
        },
      },
    }));
    return filteredData;
  } catch (error) {
    throw new Error(
      `Error al obtener el la informacion: ${(error as Error).message}`
    );
  }
};

export const newOdds = async (
  league: any,
  season: any,
  fixture: any
) => {
  try {
    const baseUrl = process.env.NEW_API_URL;
    const url = `${baseUrl}odds?league=${league}&timezone=America/Argentina/Buenos_Aires&season=${season}&fixture=${fixture}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": process.env.NEW_API_KEY_APIFOOTBALL!,
      },
    });
    const result = await response.json();
    if (result.length === 0) {
      return { msg: "No hay partidos" };
    }
    const info = result.response[0];
    const filteredData = {
        league: {
            id: info.league.id,
            name: info.league.name,
            country: info.league.country,
            logo: info.league.logo,
            flag: info.league.flag,
            season: info.league.season
        },
        fixture: {
            id: info.fixture.id,
            timezone: info.fixture.timezone,
            date: info.fixture.date,
            timestamp: info.fixture.timestamp
        },
        odds: info.bookmakers
            .filter((bookmaker: any) => bookmaker.name === "NordicBet")
            .flatMap((bookmaker: any) =>
                bookmaker.bets
                    .filter((bet: any) => bet.name === "Match Winner")
                    .flatMap((bet: any) => bet.values)
            )
    };
    return filteredData;
  } catch (error) {
    throw new Error(
      `Error al obtener el la informacion: ${(error as Error).message}`
    );
  }
};

export const  newTeamApi = async (
  team: any,
  season: any,
  page:any
) => {
  try {
    const baseUrl = process.env.NEW_API_URL;
    const url = `${baseUrl}players?team=${team}&season=${season}&page=${page}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": process.env.NEW_API_KEY_APIFOOTBALL!,
      },
    });
    const result = await response.json();
    if (result.length === 0) {
      return { msg: "No hay partidos" };
    }
    const info = result.response;
    const filteredData = info.map((item: any) => ({
      player: {
        id: item.player.id,
        name: item.player.name,
        photo: item.player.photo,
        injured: item.player.injured,
        statistics: {
          goals: item.statistics[0].goals.total,
          assists: item.statistics[0].goals.assists,
          cards: {
            yellow: item.statistics[0].cards.yellow,
            red: item.statistics[0].cards.red
          }
        }
      },
     
    }));
    const resultData = {
      page:{
        current:result.paging.current,
        total: result.paging.total
      },
      filteredData
    }
    return resultData;
  } catch (error) {
    throw new Error(
      `Error al obtener el la informacion: ${(error as Error).message}`
    );
  }
}

export const newApiLeague = async (search:any) => {
  try {
    const baseUrl = process.env.NEW_API_URL;
    const url = `${baseUrl}leagues?search=${search}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": process.env.NEW_API_KEY_APIFOOTBALL!,
      },
    });
    const result = await response.json();
    if (result.length === 0) {
      return { msg: "No hay partidos" };
    }
    const info = result.response;
    const filteredData = info.map((item: any) =>  ({
      league: {
        id: item.league.id,
        name: item.league.name,
        logo: item.league.logo,
        type: item.league.type,
      },
    }));
    return filteredData
  } catch (error) {
    throw new Error(
      `Error al obtener el la informacion: ${(error as Error).message}`
    );
  }
}

export const newMatchEnded = async (fixtureId:any) => {
  try {
    const baseUrl = process.env.NEW_API_URL;
    const url = `${baseUrl}fixtures/players?fixture=${fixtureId}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": process.env.NEW_API_KEY_APIFOOTBALL!,
      },
    });
    const result = await response.json();
    if (result.length === 0) {
      return { msg: "No hay partidos" };
    }
    const info = result.response;
    const filteredData = info.map((teamData: any) => ({
      team: {
          id: teamData.team.id,
          name: teamData.team.name,
          logo: teamData.team.logo,
          update: teamData.team.update,
          players: teamData.players.map((playerData: any) => ({
              id: playerData.player.id,
              name: playerData.player.name,
              photo: playerData.player.photo,
              statistics: {
                  rating: playerData.statistics[0].games.rating,
                  goals: playerData.statistics[0].goals.total,
                  assists: playerData.statistics[0].goals.assists,
                  yellowCards: playerData.statistics[0].cards.yellow,
                  redCards: playerData.statistics[0].cards.red
              }
          }))
      }
  }));
  return filteredData;
  } catch (error) {
    throw new Error(
      `Error al obtener el la informacion: ${(error as Error).message}`
    );
  }
}

export const endedMatch = async (id: any) => {
  try {
    const baseUrl = process.env.NEW_API_URL;
    const url = `${baseUrl}fixtures?id=${id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": process.env.NEW_API_KEY_APIFOOTBALL!,
      },
    });
    const result = await response.json();
    if (result.length === 0) {
      return { msg: "No hay partidos" };
    }
    const info = result.response;

    const filteredData = info.map((teamData: any) => ({
      teams: {
        home: teamData.teams.home.name,
        homeLogo: teamData.teams.home.logo,
        away: teamData.teams.away.name,
        awayLogo: teamData.teams.away.logo,
        result: teamData.teams.home.winner
        ? "win_home"
        : teamData.teams.away.winner
        ? "win_away"
        : "draw",
      },
      goals: {
        home: teamData.goals.home,
        away: teamData.goals.away,
      },
    }));
    return filteredData;
  } catch (error) {
    throw new Error(
      `Error al obtener el la informacion: ${(error as Error).message}`
    );
  }
};