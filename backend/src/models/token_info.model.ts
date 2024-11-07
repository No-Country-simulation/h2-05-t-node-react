import { UUIDV4 } from "sequelize";
import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import { TokenInfoAttributesInterface } from "../interfaces/token_info.interface";
import { Token } from "./token.model";
import { TokenRecord } from "./token_record";


@Table({
  tableName: "tokens_info",
  timestamps: true,
})
export class TokenInfo extends Model<TokenInfo, TokenInfoAttributesInterface> {
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
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  photo!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  total_tokens!: number;
  
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  assigned_tokens!: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  burning_percentage!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  age!: number;
  
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  position!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  games!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  goals!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  assists_goals!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
  })
  minutes_played!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,

    defaultValue: 0,
  })
  cards_yellow!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0,
  })
  cards_red!: number;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  achievements!: Array<{
    league: string;
    country: string;
    season: string;
    place: string;
    porcentage: string;
  }>;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  apiId!: string;

  @HasMany(() => Token)
  tokens!: Token[];

  @HasMany(() => TokenRecord)
  token_records!: TokenRecord[];
}
