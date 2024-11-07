import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { UUIDV4 } from "sequelize";
import { predictionQuotaInterface } from "../interfaces/prediction_quota.interface";

@Table({
    tableName: "predictions_quota",
    timestamps: true,
  })
export class PredictionQuota extends Model<PredictionQuota,predictionQuotaInterface> {
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
      type: DataType.DATEONLY,
      allowNull: false,
    })
    date!: Date;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 5, // 5 predicciones diarias por defecto
    })
    daily_predictions_left!: number;
  
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      defaultValue: 2, // 2 predicciones futuras por defecto
    })
    future_predictions_left!: number;
  
    @BelongsTo(() => User)
    user!: User;
  }
  