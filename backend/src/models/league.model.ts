import { UUIDV4 } from "sequelize";
import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "leagues",
  timestamps: true,
})
export class League extends Model<League> {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  lige_id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  country!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_apiLeague!: number;
}
