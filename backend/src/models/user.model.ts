import { UUIDV4 } from "sequelize";
import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { Ranking } from "./ranking.model";
//importar Match_record
@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  })
  id?: string;

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
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'Usuario'
  })
  rol!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  photo!: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  total_predictions!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  subscription!: boolean;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  registration_date!: Date;

  @ForeignKey(() => Ranking)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    onDelete: 'CASCADE'
  })
  ranking_id!:string;

/*   @Column({
    type: DataType.STRING,
    references: {
      model: 'match_recod',
      key: 'match_recod_id'
    }
  })
  match_recod_id!: string; */

/*   @ForeignKey(() => Match_recod)  // Establece la clave foránea hacia el modelo 'League'
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  match_recod_id!: string; */
}

