import { UUIDV4 } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user.model";
import { predictionInterface } from "../interfaces/prediction.interface";
import { PredictionInfo } from "./prediction_info.model";
import { PredictionRecord } from "./predictionRecord.model";

@Table({
  tableName: "bets",
  timestamps: true,
})
export class Prediction extends Model<Prediction, predictionInterface> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  })
  id!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    onDelete: "CASCADE",
  })
  user_id!: string;

  @Column({
    type: DataType.ENUM("simple", "chained"),
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 1,
  })
  bet_points!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  date!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "pending",

  })
  status!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
  })
  total_points!: number;

  // Relación muchos a 1 con User
  @BelongsTo(() => User)
  user!: User;

  // Relación 1 a muchos con PredictionDetail
  @HasMany(() => PredictionInfo)
  predictionInfos!: PredictionInfo[];

  // Relación 1 a muchos con PredictionRecord
  @HasMany(() => PredictionRecord)
  records!: PredictionRecord[];
}
