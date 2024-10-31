import { Sequelize } from 'sequelize-typescript';
import { League } from '../models/league.model';
import { Match } from '../models/match.model';
import { PredictionInfo } from '../models/prediction_info.model';
import { Prediction } from '../models/prediction.model';
import { User } from '../models/user.model';
import { Ranking } from '../models/ranking.model';
import { Prize } from '../models/prize.model';
import { PredictionRecord } from '../models/predictionRecord.model';
import { PredictionQuota } from '../models/predictionQuota.model';
import { DB_URL } from './enviroment';
import pg from 'pg';

/* if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST) {
  throw new Error('Faltan variables de entorno para la configuración de la base de datos.');
} */

const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  dialectModule: pg,
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false
    }
  }
});
/* const sequelize = new Sequelize({
  database: process.env.DB_NAME ,
  username: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  host: process.env.DB_HOST,
  dialect: 'mysql',
});
 */
sequelize.addModels([
  User,
  Match,
  League,
  PredictionInfo,
  Prediction,
  Ranking,
  Prize,
  PredictionRecord,
  PredictionQuota,
]);

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
 