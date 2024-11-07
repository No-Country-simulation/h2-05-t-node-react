/* import sequelize from "../config/database";
import { QueryTypes } from "sequelize";
import { getAllMatches } from "../services/api.service";
import { updateOneMatch } from "../services/match.service";
import { getFirstDate, getSecondDate } from "./days";



export const matchResult = async () => {
  try {
    const firstDate = getFirstDate();
    const secondDate = getSecondDate();
    const result = await sequelize.query(
      `SELECT * FROM matches WHERE result is null`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if(result.length === 0) {
      return {msg: 'No hay partidos para actualizar'};
    }
    const resultMap = await Promise.all(
      result.map(async (item: any) => {
        const MatchResult = await getAllMatches(
          firstDate,
          secondDate,
          item.id_apiMatch,
          null
        );

        let dayMatchResult;
        if (MatchResult[0].hometeam_score > MatchResult[0].awayteam_score) {
          dayMatchResult = "win_home";
        } else if (MatchResult[0].hometeam_score < MatchResult[0].awayteam_score) {
          dayMatchResult = "win_away";
        } else {
          dayMatchResult = "draw";  
        }
        await updateOneMatch(item.id, { result: dayMatchResult, status: 'completed' });
      })
    );
    if (!resultMap || resultMap.length === 0) {
      console.log("No hay resultados para actualizar");
      throw new Error("No hay resultados para actualizar");
    }
    return result;
  } catch (error) {
    console.error(
      `Error al consultar los resultados: ${(error as Error).message}`
    );
    throw new Error(
      `Error al consultar los resultados: ${(error as Error).message}`
    );
  }
};
matchResult(); */