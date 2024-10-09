import { UUIDV4 } from "sequelize";
import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import { Ranking } from "./ranking.model";
import { userInterface } from "../interfaces/user.interface";
//importar Match_record
@Table({
  tableName: "users",
  timestamps: true,
})
export class User extends Model<User, userInterface> {
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
    allowNull: true,
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

  @ForeignKey(() => Ranking)
  @Column({
    type: DataType.UUID,
    allowNull: true,
    onDelete: 'CASCADE'
  })
  ranking_id!: string;

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

