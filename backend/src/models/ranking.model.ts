import { UUIDV4 } from "sequelize";
import {
  Table,
  Model,
  DataType,
  Column,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { User } from "./user.model";
import { RankingAttributes } from "../interfaces/ranking.interface";

@Table({
  tableName: "ranking",
  timestamps: true,
})
export class Ranking extends Model<Ranking,RankingAttributes>
 {
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
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  points!: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 4,
  })
  division!: number;

  @BelongsTo(() => User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    hooks: true,
  })
  user!: User;
}
