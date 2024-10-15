import { predictionInterface } from "../interfaces/prediction.interface";
import { Prediction } from "../models/prediction.model";
import { PredictionRecord } from "../models/predictionRecord.model";
//import { Ranking } from "../models/ranking.model";
import { addPoints } from "./ranking.service";
import { User } from "../models/user.model";
import { PredictionInfo } from "../models/prediction_info.model";
import { PredictionQuota } from "../models/predictionQuota.model";

export const getPredictions = async (): Promise<Prediction[]> => {
  try {
    const prediction = await Prediction.findAll();
    if (!prediction) throw new Error("Predicciones no encontrados");
    return prediction;
  } catch (error) {
    throw new Error(
      `Error al obtener las Predicciones: ${(error as Error).message}`
    );
  }
};

export const getPrediction = async (id: any): Promise<Prediction> => {
  try {
    const prediction = await Prediction.findOne(id);
    if (!prediction) throw new Error("Predicción no encontrados");
    return prediction;
  } catch (error) {
    throw new Error(
      `Error al obtener las Predicciones: ${(error as Error).message}`
    );
  }
};

export const createPrediction = async (
  data: predictionInterface
): Promise<any> => {
  try {
    const prediction = await Prediction.create(data);
    if (!prediction) throw new Error("Predicción no creado");
    if (!prediction.user_id || !prediction.id) {
      throw new Error(
        "Datos faltantes para crear el registro de la predicción."
      );
    }
    const dataRecord: any = {
      user_id: prediction.user_id,
      prediction_id: prediction.id,
    };
    const predRecord = await PredictionRecord.create(dataRecord);
    if (!predRecord) throw new Error("Registro no creado");
    return prediction;
  } catch (error) {
    throw new Error(
      `Error al crear la Predicción: ${(error as Error).message}`
    );
  }
};
export const createPredictions = async (
  user: User,
  predictions: {
    match_id: string;
    predictionType: "match" | "player";
    selectedPredictionType: "win_home" | "win_away" | "draw" | "player";
    fee: number;
    quotaType: "daily" | "future";
    date: Date;
  }[],
  type: "simple" | "chained"
) => {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0]; // Para formatear la fecha en 'YYYY-MM-DD'

  // Verificar cuántas predicciones disponibles tiene el usuario para hoy
  let predictionQuota = await PredictionQuota.findOne({
    where: {
      user_id: user.id,
      date: todayString,
    },
  });

  // Si no existe un registro de cuota de predicciones para el usuario hoy, crearlo
  if (!predictionQuota) {
    predictionQuota = await PredictionQuota.create({
      user_id: user.id,
      date: today,
      daily_predictions_left: 5,
      future_predictions_left: 2,
    });
  }

  // Contadores de predicciones
  let totalDailyPredictions = 0;
  const futurePredictionsByDay: { [date: string]: number } = {};

  // Contar las predicciones diarias y futuras en la solicitud
  for (const prediction of predictions) {
    if (
      prediction.quotaType === "daily" &&
      prediction.date.toDateString() === today.toDateString()
    ) {
      totalDailyPredictions++;
    } else if (prediction.quotaType === "future") {
      const futureDateString = prediction.date.toISOString().split("T")[0];

      // Inicializar el contador para ese día futuro si aún no existe
      if (!futurePredictionsByDay[futureDateString]) {
        futurePredictionsByDay[futureDateString] = 0;
      }

      futurePredictionsByDay[futureDateString]++;

      // Verificar si se excede el límite de 2 futuras predicciones para ese día
      if (futurePredictionsByDay[futureDateString] > 2) {
        throw new Error(
          `No puedes hacer más de 2 predicciones futuras para el día ${futureDateString}.`
        );
      }
    }
  }

  // Verificar si se exceden los límites diarios
  if (totalDailyPredictions > predictionQuota.daily_predictions_left) {
    throw new Error(
      `No tienes suficientes predicciones diarias disponibles (${predictionQuota.daily_predictions_left} restantes).`
    );
  }

  // Cálculo de puntos en caso de predicciones encadenadas
  let totalPoints = 1; // Inicia con 1 punto base para simple y se acumula para encadenadas
  if (type === "chained") {
    let multiplier = 10; // Empieza en 10 para 2 predicciones encadenadas
    for (let i = 0; i < predictions.length; i++) {
      totalPoints *= predictions[i].fee;
      if (i > 0) {
        multiplier += 10; // Crece por 10 por cada predicción extra
      }
    }
    totalPoints *= multiplier; // Aplica el multiplicador final
  } else if (type === "simple") {
    totalPoints = 1 * predictions[0].fee; // En simple solo se usa el fee de la única predicción
  }

  // Creación de las predicciones en la base de datos
  const createdPredictions = [];
  const newPrediction = await Prediction.create({
    user_id: user.id,
    type: type,
    total_points: totalPoints,
    status: "pending",
  });
  if (!newPrediction) throw new Error("Prediccion no creada");


  const predRecord = await PredictionRecord.create({
    user_id: user.id,
    prediction_id: newPrediction.id,
  });
  if (!predRecord) throw new Error("Registro no creado");
  

  for (const prediction of predictions) {
    const createdPredictionInfo = await PredictionInfo.create({
      match_id: prediction.match_id,
      prediction_id: newPrediction.id, // Relacionar con la predicción creada
      predictionType: prediction.predictionType,
      predictionQuotaType: prediction.quotaType,
      selectedPredictionType: prediction.selectedPredictionType,
      fee: prediction.fee,
      prediction_date: prediction.date,
      status: "pending",
    });
    createdPredictions.push(createdPredictionInfo);
  }

  // Si es encadenada, actualizamos los puntos totales en la predicción principal
  if (type === "chained") {
    await newPrediction.update({ total_points: totalPoints });
  }

  // Actualizar las cuotas futuras para los días afectados
  for (const futureDate in futurePredictionsByDay) {
    let futureQuota = await PredictionQuota.findOne({
      where: { user_id: user.id, date: futureDate },
    });

    if (!futureQuota) {
      // Si no existe la cuota futura, crear una nueva para ese día con los valores predeterminados
      futureQuota = await PredictionQuota.create({
        user_id: user.id,
        date: new Date(futureDate),
        daily_predictions_left: 5,
        future_predictions_left: 2,
      });
    }

    // Reducir las predicciones futuras disponibles
    await futureQuota.update({
      future_predictions_left:
        futureQuota.future_predictions_left -
        futurePredictionsByDay[futureDate],
    });
  }

  // Actualizar las cuotas diarias después de crear las predicciones
  await predictionQuota.update({
    daily_predictions_left:
      predictionQuota.daily_predictions_left - totalDailyPredictions,
  });

  return `Has creado ${createdPredictions.length} predicciones con éxito.`;
};

export const deletePrediction = async (id: any) => {
  try {
    const prediction = await Prediction.destroy({ where: { id: id } });
    if (!prediction) throw new Error("Predicción no eliminada");
    return { msg: "Predicción eliminada" };
  } catch (error) {
    throw new Error(
      `Error al eliminar la Predicción: ${(error as Error).message}`
    );
  }
};

export const updatePrediction = async (
  id: string,
  updateData: any
): Promise<any> => {
  try {
    const prediction = await Prediction.findByPk(id);

    if (!prediction) {
      throw new Error("Predicción no encontrada");
    }

    // Guardar el estado anterior para comparar
    const previousStatus = prediction.status;

    // Actualizar los datos de la predicción
    await prediction.update(updateData);

    // Verificar si la predicción ha cambiado a "win" cambiar por el estada usado
    if (updateData.status === "win" && previousStatus !== "win") {
      const point = addPoints(id, prediction.total_points);
      if (!point) {
        throw new Error("No se pudo añadir los puntos a la clasificación");
      }
    }
    // Actualizar registro en el historial de predicciones
    const predictionRecord = await PredictionRecord.findOne({
      where: { prediction_id: id },
    });

    if (predictionRecord) {
      // Si existe, actualizar los datos del registro
      await predictionRecord.update(updateData);
    } else {
      // Si no existe, crear un nuevo registro (para casos donde no haya historial previo)
      await PredictionRecord.create({
        prediction_id: id,
        ...updateData,
        timestamp: new Date(),
      });
    }
    return { msg: "Predicción actualizado" };
  } catch (error) {
    throw new Error(
      `Error al actualizado la Predicción: ${(error as Error).message}`
    );
  }
};
