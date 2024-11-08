import sequelize from "../config/database";
import { QueryTypes } from "sequelize";
import { endedMatch } from "../services/api.service";
import { updateOneMatch } from "../services/match.service";

export const matchResult = async () => {
  try {
    const result = await sequelize.query(
      `SELECT * FROM matches WHERE result is null`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (result.length === 0) {
      return { msg: "No hay partidos para actualizar" };
    }

    const resultMap = await Promise.all(
      result.map(async (item: any) => {
        try {
          const MatchResult = await endedMatch(
            item.id_apiMatch,
          );
          // Verificar que MatchResult es un array y tiene datos válidos
          if (!Array.isArray(MatchResult) || MatchResult.length === 0) {
            console.error(
              `MatchResult no contiene datos válidos para id_apiMatch: ${item.id_apiMatch}`
            );
            return null; // Retornamos null en caso de error para no interrumpir el flujo
          }
          await updateOneMatch(item.id, {
            result: MatchResult[0].teams.result,
            status: "completed",
          });
          return {msg: 'Resultados actualizados'};
        } catch (err) {
          console.error(`Error al procesar el partido ${item.id}: ${err}`);
          return null; // Retornamos null si hubo un error al procesar un partido
        }
      })
    );

    // Filtrar valores null de resultMap
    const filteredResultMap = resultMap.filter((item) => item !== null);

    if (filteredResultMap.length === 0) {
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

matchResult();
