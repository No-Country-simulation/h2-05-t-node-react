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
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST) {
    throw new Error('Faltan variables de entorno para la configuración de la base de datos.');
}
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME || 'mydb',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    models: [user_model_1.User, match_model_1.Match, league_model_1.League, prediction_info_model_1.PredictionInfo, prediction_model_1.Prediction, ranking_model_1.Ranking, prize_model_1.Prize, predictionRecord_model_1.PredictionRecord]
});
// Relacionar los modelos
user_model_1.User.hasOne(ranking_model_1.Ranking);
ranking_model_1.Ranking.belongsTo(user_model_1.User);
user_model_1.User.hasMany(prediction_model_1.Prediction);
prediction_model_1.Prediction.belongsTo(user_model_1.User);
prediction_model_1.Prediction.hasMany(prediction_info_model_1.PredictionInfo);
prediction_info_model_1.PredictionInfo.belongsTo(prediction_model_1.Prediction);
prediction_model_1.Prediction.hasMany(predictionRecord_model_1.PredictionRecord);
predictionRecord_model_1.PredictionRecord.belongsTo(prediction_model_1.Prediction);
exports.default = sequelize;
//# sourceMappingURL=database.js.map