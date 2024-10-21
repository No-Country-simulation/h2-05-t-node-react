import sequelize from "../config/database";
import { QueryTypes } from "sequelize";
import cron from "node-cron";
import { getAllMatches } from "../services/api.service";
import { updateOneMatch } from "../services/match.service";

const getFirstDate = () => {
  const today = new Date();
  today.setDate(today.getDate() - 2); // Restar un día
  return today.toISOString().split("T")[0]; // Formato YYYY-MM-DD
};

const getSecondDate = () => {
  const today = new Date();
  today.setDate(today.getDate() - 1); // Restar un día
  return today.toISOString().split("T")[0]; // Formato YYYY-MM-DD
};

const executeQuery = async () => {
  try {
    const firstDate = getFirstDate();
    const secondDate = getSecondDate();
    const result = await sequelize.query(
      `SELECT * FROM matches`,
      {
        type: QueryTypes.SELECT,
      }
    );
    
    const resultMap = await Promise.all(
      result.map(async (item: any) => {
        const MatchResult = await getAllMatches(
          firstDate,
          secondDate,
          item.id_apiMatch,
          null
        );
        // Determinar el resultado del partido y actualizar la base de datos
        let dayMatchResult;
        if (MatchResult[0].hometeam_score > parseInt(MatchResult[0].awayteam_score)) {
          dayMatchResult = "win_home";
        } else if (MatchResult[0].hometeam_score < parseInt(MatchResult[0].awayteam_score)) {
          dayMatchResult = "win_away";
        } else {
          dayMatchResult = "draw";
        }

        // Actualizar el partido con el resultado
        await updateOneMatch(item.id, { result: dayMatchResult });
      })
    );

    // Verificar si no hay resultados en el mapa
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

// Configurar el cron para ejecutarse todos los días a las 00:00
cron.schedule("0 0 * * *", async () => {
  await executeQuery();
});

executeQuery();
