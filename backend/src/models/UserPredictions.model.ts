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
  tableName: "user_predictions",
  timestamps: true, // Esto agrega createdAt y updatedAt automáticamente
})
export class UserPredictions extends Model<UserPredictions, UserPredictions> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  })
  id?: string;
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  user_id!: string;

  @Column({
    type: DataType.DATEONLY, // Almacena solo la fecha (sin la hora)
    allowNull: false,
  })
  date!: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0, // Predicciones usadas hoy
  })
  predictions_used!: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0, // Predicciones tomadas de días futuros
  })
  future_predictions_used!: number;
  
}
