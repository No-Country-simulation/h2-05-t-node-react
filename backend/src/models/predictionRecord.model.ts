import { UUIDV4 } from "sequelize"; // Importar UUIDV4 para generar automáticamente IDs
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./user.model";
import { Prediction } from "./prediction.model";

@Table({
  tableName: "predictionRecord",
  timestamps: true,
})
export class predictionRecord extends Model<predictionRecord> {
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
    onDelete: "CASCADE",
  })
  user_id!: string;

  @ForeignKey(() => Prediction)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    onDelete: "CASCADE",
  })
  prediction_id!: string;
}
