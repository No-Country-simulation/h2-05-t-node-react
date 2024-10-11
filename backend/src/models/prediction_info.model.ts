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

@Table({
  tableName: "prediction_info",
  timestamps: true,
})
export class PredictionInfo extends Model<PredictionInfo> {
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
    type: DataType.STRING,
    allowNull: false,
  })
  predicion!: string;

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
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  status!: boolean;

  // Relación muchos a 1 con Prediction
  @BelongsTo(() => Prediction)
  prediction!: Prediction;
}
