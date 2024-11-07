import { UUIDV4 } from "sequelize";
import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { TokenAttributesInterface } from "../interfaces/token.interface";
import { TokenInfo } from "./token_info.model";


@Table({
  tableName: "tokens",
  timestamps: true,
})
export class Token extends Model<Token, TokenAttributesInterface> {
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
  user_id!: string;

  @ForeignKey(() => TokenInfo)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  token_info_id!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    unique: true,
  })
  unique_identifier!: number;
 
  @BelongsTo(() => TokenInfo)
  token_info!: TokenInfo;

}
