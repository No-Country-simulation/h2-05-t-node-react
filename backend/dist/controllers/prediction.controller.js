"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOnePrediction = exports.deleteOnePrediction = exports.postCreatePrediction = exports.getOnePrediction = exports.getAllPredictions = void 0;
const match_service_1 = require("../services/match.service");
const prediction_service_1 = require("../services/prediction.service");
const enumsErrors_1 = require("../utils/enumsErrors");
const HttpResponse = new enumsErrors_1.httpResponse();
const getAllPredictions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prediction = yield (0, prediction_service_1.getPredictions)();
        if (!prediction) {
            return HttpResponse.DATA_BASE_ERROR(res, "Predicciones no encontradas");
        }
        return HttpResponse.OK(res, prediction);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.getAllPredictions = getAllPredictions;
const getOnePrediction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const prediction = yield (0, prediction_service_1.getPrediction)(id);
        if (!prediction) {
            return HttpResponse.DATA_BASE_ERROR(res, "Predicción no encontrada");
        }
        return HttpResponse.OK(res, prediction);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.getOnePrediction = getOnePrediction;
const postCreatePrediction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        /*   (
          user: User,
          predictions: {
            match_id: string;
            predictionType: "match" | "player";
            selectedPredictionType: "win_home" | "win_away" | "draw" | "player";
            fee: number;
            quotaType: "daily" | "future";
            date: Date;
          }[],
          type: "simple" | "chained",
          matchs: {
            team_a: team_a,
            team_b: team_b,
            match_date: match_date,
            status: status,
            id_apiMatch: id_apiMatch,
            league_id: league_id
          }[],
        ) */
        const predictions = yield (0, prediction_service_1.createPredictions)(data.user, data.predictions, data.type);
        if (!predictions) {
            return HttpResponse.DATA_BASE_ERROR(res, "Error al cargar datos");
        }
        //Crear partidos
        const matches = data.matchs;
        if (!Array.isArray(matches) || matches.length === 0) {
            return HttpResponse.BAD_REQUEST_ERROR(res, "No se proporcionaron partidos para crear.");
        }
        const createMatches = yield (0, match_service_1.CreateMatches)(matches);
        if (!createMatches) {
            return HttpResponse.DATA_BASE_ERROR(res, "Error al cargar datos");
        }
        return HttpResponse.OK(res, "Prediccion creada con exito");
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.postCreatePrediction = postCreatePrediction;
const deleteOnePrediction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const prediction = yield (0, prediction_service_1.deletePrediction)(id);
        if (!prediction)
            return HttpResponse.DATA_BASE_ERROR(res, "Error al eliminar predición");
        return HttpResponse.OK(res, prediction);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.deleteOnePrediction = deleteOnePrediction;
const updateOnePrediction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = req.body;
        const prediction = yield (0, prediction_service_1.updatePrediction)(id, data);
        if (!prediction) {
            return HttpResponse.DATA_BASE_ERROR(res, "Error al actualizar predición");
        }
        return HttpResponse.OK(res, prediction);
    }
    catch (error) {
        return HttpResponse.Error(res, error.message);
    }
});
exports.updateOnePrediction = updateOnePrediction;
/* export const userPredictions = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const prediction = await userOnePrediction(id);

    if (!prediction) {
      return HttpResponse.DATA_BASE_ERROR(res, "Error al actualizar predición");
    }
    return HttpResponse.OK(res, prediction);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

// Endpoint para usar una predicción futura con un día pasado desde el front-end
export const createFuturePrediction = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user_id;
    const futureDate = req.body.future_date; // El día futuro pasado desde el front-end
    await handleFuturePrediction(userId, futureDate, res);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};
 */
//# sourceMappingURL=prediction.controller.js.map