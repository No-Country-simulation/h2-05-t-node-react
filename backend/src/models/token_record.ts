import { UUIDV4 } from "sequelize";
import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from "sequelize-typescript";
import { TokenInfo } from "./token_info.model";
import { TokenRecordAttributesInterface } from "../interfaces/token_record.interface";


@Table({
  tableName: "tokens_record",
  timestamps: true,
})
export class TokenRecord extends Model<TokenRecord, TokenRecordAttributesInterface> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  })
  id!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  age!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    unique: true,
  })
  token_number!: number;

  @ForeignKey(() => TokenInfo)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  token_info_id!: string;

  @BelongsTo(() => TokenInfo)
  token_info!: TokenInfo;

}