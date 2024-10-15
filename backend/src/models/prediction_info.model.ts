import { UUIDV4 } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  
} from "sequelize-typescript";
import { Match } from "./match.model";
import { Prediction } from "./prediction.model";
import { predictionInfo } from "../interfaces/predictionInfo.interface";

@Table({
  tableName: "prediction_info",
  timestamps: true,
})
export class PredictionInfo extends Model<PredictionInfo, predictionInfo> {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => Match)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  match_id!: string;

  @ForeignKey(() => Prediction)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  prediction_id!: string;

  @Column({
    type: DataType.ENUM("match", "player"),
    allowNull: false
  })
  predictionType!: string;
  
  @Column({
    type: DataType.ENUM("daily", "future"),
    allowNull: false
  })
  predictionQuotaType!: string;

  @Column({
    type: DataType.ENUM("win_home", "win_away", 'draw', 'player'),
    allowNull: true
  })
  selectedPredictionType!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  fee!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  prediction_date!: Date;

  @Column({
    type: DataType.STRING,
    defaultValue: "pending",
  })
  status!: string;

  // Relación muchos a 1 con Prediction
   @BelongsTo(() => Prediction)
  prediction!: Prediction; 
}
