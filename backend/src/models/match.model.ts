import { UUIDV4 } from "sequelize";
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
} from "sequelize-typescript";

import { matchInterface } from "../interfaces/match.interface";
import { PredictionInfo } from "./prediction_info.model";

@Table({
  tableName: "matches",
  timestamps: true,
})
export class Match extends Model<Match, matchInterface> {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  home_team!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  home_team_img!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  away_team!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  away_team_img!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  league!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  league_img!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  match_date!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  result!: string;

  @Column({
    type: DataType.ENUM("scheduled", "in_progress", "completed"),
    allowNull: true,
    defaultValue: "scheduled",
  })
  status!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  id_apiMatch!: string;

  // Relación 1 a muchos con PredictionInfo
  @HasMany(() => PredictionInfo)
  predictionInfos!: PredictionInfo[];

}
