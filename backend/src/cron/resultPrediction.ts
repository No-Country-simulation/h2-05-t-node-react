import sequelize from "../config/database";
import { QueryTypes } from "sequelize";
import { getFirstDate, getSecondDate } from "./days";
import dotenv from 'dotenv';
dotenv.config();

export const predictionResult = async () => {
  try {
    
    const firstDate = getFirstDate();
    const secondDate = getSecondDate();
     // Obtener el nombre de la base de datos
     const dbName = process.env.DB_NAME;
     if (!dbName) throw new Error("Faltan variables de entorno para la configuración de la base de datos.");
 
     const result = await sequelize.query(
       `SELECT * FROM ${dbName}.bets WHERE status = 'pending'`,
       {
         type: QueryTypes.SELECT,
       }
     );
 
    console.log(firstDate);
    console.log(secondDate);
    const resultMap = result.map(async (item: any) =>{
        console.log(item.bet_status);
        
    })
    return  resultMap;

    
  } catch (error) {
    console.error(
        `Error al consultar los resultados: ${(error as Error).message}`
      );
      throw new Error(
        `Error al consultar los resultados: ${(error as Error).message}`
      );
  }
};
predictionResult();