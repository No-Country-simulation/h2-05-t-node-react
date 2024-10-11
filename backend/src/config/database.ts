import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { League } from '../models/league.model';
import { Match } from '../models/match.model';
import { PredictionInfo } from '../models/prediction_info.model';
import { Prediction } from '../models/prediction.model';
import { User } from '../models/user.model';
import { Ranking } from '../models/ranking.model';
import { Prize } from '../models/prize.model';
import { predictionRecord } from '../models/predictionRecord.model';
import { FuturePredictions } from '../models/FuturePredictions.model';
import { UserPredictions } from '../models/UserPredictions.model';

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'mydb',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  models: [User, Match, League, PredictionInfo, Prediction, Ranking, Prize, predictionRecord, FuturePredictions, UserPredictions]
});

export default sequelize;
 