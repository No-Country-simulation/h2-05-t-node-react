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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.predictionResult = void 0;
const database_1 = __importDefault(require("../config/database"));
const sequelize_1 = require("sequelize");
const prediction_service_1 = require("../services/prediction.service");
const predictionResult = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.default.query(`SELECT * FROM mydb.bets_match_prediction WHERE total_points is NULL`, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        const resultMap = result.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            if (item.bets_status === 'successful' || item.bet_type === 'simple') {
                const point = 1 * item.fee;
                const bet = yield (0, prediction_service_1.updateBet)(item.bet_id, { total_points: point });
                return bet;
            }
            if (item.bets_status === 'failed' || item.bet_type === 'simple') {
                const bet = yield (0, prediction_service_1.updateBet)(item.bet_id, { total_points: 0 });
                return bet;
            }
        }));
        return resultMap;
    }
    catch (error) {
        console.error(`Error al consultar los resultados: ${error.message}`);
        throw new Error(`Error al consultar los resultados: ${error.message}`);
    }
});
exports.predictionResult = predictionResult;
(0, exports.predictionResult)();
//# sourceMappingURL=resultPrediction.js.map