import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { League } from '../models/league.model';
import { Match } from '../models/match.model';
import { PredictionInfo } from '../models/prediction_info.model';
import { Prediction } from '../models/prediction.model';
import { User } from '../models/user.model';
import { Ranking } from '../models/ranking.model';
import { Prize } from '../models/prize.model';
import { PredictionRecord } from '../models/predictionRecord.model';
import { PredictionQuota } from '../models/predictionQuota.model';

dotenv.config();

if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST) {
  throw new Error('Faltan variables de entorno para la configuración de la base de datos.');
}

const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'mydb',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  models: [User, Match, League, PredictionInfo, Prediction, Ranking, Prize, PredictionRecord, PredictionQuota]
});

// Relacionar los modelos
User.hasOne(Ranking);
Ranking.belongsTo(User);

User.hasMany(Prediction);
Prediction.belongsTo(User);

Prediction.hasMany(PredictionInfo);
PredictionInfo.belongsTo(Prediction);

Prediction.hasMany(PredictionRecord);
PredictionRecord.belongsTo(Prediction);

User.hasMany(PredictionQuota);
PredictionQuota.belongsTo(User);



export default sequelize;
 