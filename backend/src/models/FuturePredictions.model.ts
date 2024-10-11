import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./user.model";
import { UUIDV4 } from "sequelize";

@Table({
  tableName: "future_predictions",
  timestamps: true,
})
export class FuturePredictions extends Model<FuturePredictions> {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id!: string;
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id!: string;

  @Column({
    type: DataType.DATEONLY, // La fecha futura de la que se tomaron las predicciones
    allowNull: false,
  })
  future_date!: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0, // Cantidad de predicciones tomadas de esa fecha futura
  })
  predictions_taken!: number;
}
