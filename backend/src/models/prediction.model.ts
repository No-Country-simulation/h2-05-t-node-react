/*
  id_apuesta_detalle REFERENCES !!!!
  tipo varchar [note:"Simple o Encadenada"]
  puntos_apostados int
  couta_total float [note:"total de la cuota, si es encadenada se multiplica x10"] !!!!
  fecha_prediccion datetime
  estado bool
  puntos_ganados int */

import { UUIDV4 } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./user.model";

@Table({
  tableName: "bets",
  timestamps: true,
})
export class Prediction extends Model<Prediction> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    defaultValue: UUIDV4,
  })
  id!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    onDelete: 'CASCADE'
  })
  user_id!: string;

  @Column({
    type: DataType.ENUM("simple", "chained"),
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
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
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  status!: boolean;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  total_points!: number;
}
