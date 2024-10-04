import { UUIDV4 } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
} from "sequelize-typescript";

@Table({
  tableName: "prize",
  timestamps: true,
})
export class Prize extends Model<Prize> {
  @Column({
    type: DataType.STRING,
    primaryKey: true,
    defaultValue: UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  type!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  condition!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  date!: Date;
}
