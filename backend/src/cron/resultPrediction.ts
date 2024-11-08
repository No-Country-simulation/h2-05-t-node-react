import sequelize from "../config/database";
import { QueryTypes } from "sequelize";
import { getFirstDate, getSecondDate } from "./days";
import dotenv from 'dotenv';
dotenv.config();

export const predictionResult = async () => {
  try {
    const firstDate = getFirstDate();
    const secondDate = getSecondDate();
    const result = await sequelize.query(
      `SELECT * FROM mydb.bets_match_prediction WHERE bet_status = 'pending'`,
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
/* predictionResult();  */