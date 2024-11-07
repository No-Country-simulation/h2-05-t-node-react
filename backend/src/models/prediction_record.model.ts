import { UUIDV4 } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Prediction } from "./prediction.model";
import { predictionRecordInterface } from "../interfaces/prediction_record.interface";

@Table({
  tableName: "predictions_record",
  timestamps: true,
})
export class PredictionRecord extends Model<
  PredictionRecord,
  predictionRecordInterface
> {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @ForeignKey(() => Prediction)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    onDelete: "CASCADE",
  })
  prediction_id!: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    onDelete: "CASCADE",
  })
  user_id!: string;

  @BelongsTo(() => Prediction)
  prediction!: Prediction;
}
