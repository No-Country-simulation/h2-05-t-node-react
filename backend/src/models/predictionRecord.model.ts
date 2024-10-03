import { UUIDV4 } from "sequelize";  // Importar UUIDV4 para generar automáticamente IDs
import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";

@Table({
    tableName: "predictionRecord",
    timestamps: true,
  })

export class predictionRecord extends Model<predictionRecord>{}