import { UUIDV4 } from "sequelize";
import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { League } from "./league.model";

@Table({
  tableName: "matches",
  timestamps: true,
})
export class Match extends Model<Match> {
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
  team_a!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  team_b!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  match_date!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  result!: string;

  @Column({
    type: DataType.ENUM('scheduled', 'in_progress', 'completed'),
    allowNull: false,
  })
  status!: string;

  @ForeignKey(() => League)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    onDelete: 'CASCADE'
  })
  lige_id!: string;
}
