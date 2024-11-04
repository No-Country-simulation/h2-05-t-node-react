import sequelize from "../config/database";
import { QueryTypes } from "sequelize";
import { updateBet } from "../services/prediction.service";


export const predictionResult = async () => {
  try {
    const result = await sequelize.query(
      `SELECT * FROM mydb.bets_match_prediction WHERE total_points is NULL`,
      {
        type: QueryTypes.SELECT,
      }
    );
    const resultMap = result.map(async (item: any) =>{
        if(item.bets_status === 'successful' || item.bet_type === 'simple'){
          const point = 1 * item.fee;
          const bet = await updateBet(item.bet_id, {total_points: point});
          return bet;
        } 
      if(item.bets_status === 'failed' || item.bet_type === 'simple'){
          const bet = await updateBet(item.bet_id, {total_points: 0});
          return bet;
      }
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