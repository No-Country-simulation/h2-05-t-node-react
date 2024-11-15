import { UUIDV4 } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  HasOne,
  HasMany,
} from "sequelize-typescript";
import { Ranking } from "./ranking.model";
import { userInterface } from "../interfaces/user.interface";
import { Prediction } from "./prediction.model";
//importar Match_record
@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model<User, userInterface> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "Usuario",
  })
  rol!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  photo!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
  })
  total_predictions!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  })
  subscription!: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  registration_date!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  googleId!: string;

  // relación 1 a 1 con Ranking
  @HasOne(() => Ranking)
  ranking!: Ranking;

  // Relación 1 a muchos con Prediction
  @HasMany(() => Prediction)
  predictions!: Prediction[];

}
