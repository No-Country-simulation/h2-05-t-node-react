import { Op } from "sequelize";
import { Prediction } from "../models/prediction.model";
import { HistoryFilterOptions } from "../interfaces/prediction.interface";
import { PredictionInfo } from "../models/prediction_info.model";
import { Match } from "../models/match.model";

export const predictionHistoryByUser = async (
  userId: string,
  filters: HistoryFilterOptions
) => {
  const { status, startDate, endDate, page = 1 } = filters;
  const limit = 10; // Máximo de 10 resultados por página
  const offset = (page - 1) * limit; // Calcular el offset basado en la página actual

  try {
    const predictionsWithHistory = await Prediction.findAndCountAll({
      where: {
        user_id: userId,
        ...(status && { status }), // Filtrar por estado de la predicción si se proporciona
      },
      include: [
        {
          model: PredictionInfo,
          attributes: ["predictionType","predictionQuotaType","selectedPredictionType","prediction_date","status"],
          where: {
            ...(startDate &&
              endDate && {
                timestamp: {
                  [Op.between]: [startDate, endDate],
                },
              }),
          },
          include: [
            {
              model: Match, // Incluir el modelo Match
              attributes: [
                "home_team",
                "home_team_img",
                "away_team",
                "away_team_img",
                "match_date",
                "league",
                "league_img",
                "result",
                "status",
              ], // Selecciona solo los campos necesarios
            },
          ],
        },
      ],
      attributes: ["id","total_points", "status", "type"], // Incluir los campos
      limit, // Limitar a 10 resultados por página
      offset, // Saltar resultados basados en la página actual
    });

    const totalPages = Math.ceil(predictionsWithHistory.count / limit);
    return {
      results: predictionsWithHistory.rows,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching paginated prediction history:", error);
    throw error;
  }
};
