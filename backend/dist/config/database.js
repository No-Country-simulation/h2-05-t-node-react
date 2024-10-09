"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = __importDefault(require("dotenv"));
const league_model_1 = require("../models/league.model");
const match_model_1 = require("../models/match.model");
const prediction_info_model_1 = require("../models/prediction_info.model");
const prediction_model_1 = require("../models/prediction.model");
const user_model_1 = require("../models/user.model");
const ranking_model_1 = require("../models/ranking.model");
const prize_model_1 = require("../models/prize.model");
const predictionRecord_model_1 = require("../models/predictionRecord.model");
dotenv_1.default.config();
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME || 'mydb',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    models: [user_model_1.User, match_model_1.Match, league_model_1.League, prediction_info_model_1.PredictionInfo, prediction_model_1.Prediction, ranking_model_1.Ranking, prize_model_1.Prize, predictionRecord_model_1.predictionRecord]
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map