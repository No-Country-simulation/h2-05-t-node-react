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
const days_1 = require("./days");
const predictionResult = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstDate = (0, days_1.getFirstDate)();
        const secondDate = (0, days_1.getSecondDate)();
        const result = yield database_1.default.query(`SELECT * FROM mydb.bets_match_prediction WHERE bet_status = 'pending'`, {
            type: sequelize_1.QueryTypes.SELECT,
        });
        console.log(firstDate);
        console.log(secondDate);
        const resultMap = result.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(item.bet_status);
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