import { Op } from "sequelize";
import { Prediction } from "../models/prediction.model";
import { PredictionRecord } from "../models/predictionRecord.model";
import { HistoryFilterOptions } from "../interfaces/prediction.interface";

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
          model: PredictionRecord,
          where: {
            ...(startDate &&
              endDate && {
                // Filtrar por rango de fechas en el historial
                timestamp: {
                  [Op.between]: [startDate, endDate],
                },
              }),
          },
        },
      ],
      attributes: ["total_points", "status"], // Incluir los campos `total_points` y `status`
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
