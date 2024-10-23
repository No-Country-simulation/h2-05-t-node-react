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
exports.matchResult = void 0;
const database_1 = __importDefault(require("../config/database"));
const sequelize_1 = require("sequelize");
const api_service_1 = require("../services/api.service");
const match_service_1 = require("../services/match.service");
const days_1 = require("./days");
const matchResult = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstDate = (0, days_1.getFirstDate)();
        const secondDate = (0, days_1.getSecondDate)();
        const result = yield database_1.default.query(`SELECT * FROM matches WHERE result is null`, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (result.length === 0) {
            return { msg: 'No hay partidos para actualizar' };
        }
        const resultMap = yield Promise.all(result.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const MatchResult = yield (0, api_service_1.getAllMatches)(firstDate, secondDate, item.id_apiMatch, null);
            let dayMatchResult;
            if (MatchResult[0].hometeam_score > MatchResult[0].awayteam_score) {
                dayMatchResult = "win_home";
            }
            else if (MatchResult[0].hometeam_score < MatchResult[0].awayteam_score) {
                dayMatchResult = "win_away";
            }
            else {
                dayMatchResult = "draw";
            }
            yield (0, match_service_1.updateOneMatch)(item.id, { result: dayMatchResult, status: 'completed' });
        })));
        if (!resultMap || resultMap.length === 0) {
            console.log("No hay resultados para actualizar");
            throw new Error("No hay resultados para actualizar");
        }
        return result;
    }
    catch (error) {
        console.error(`Error al consultar los resultados: ${error.message}`);
        throw new Error(`Error al consultar los resultados: ${error.message}`);
    }
});
exports.matchResult = matchResult;
(0, exports.matchResult)();
//# sourceMappingURL=matchResult.js.map