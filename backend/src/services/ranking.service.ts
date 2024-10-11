import { Ranking } from "../models/ranking.model";
import { Op } from "sequelize";
import  sequelize  from "../config/database";
//Asigna las divisiones de todos los usuarios con puntos
export async function assignDivisions() {
    const usersWithPoints = await Ranking.findAll({
      where: {
        points: { [Op.gt]: 0 },
      },
      order: [['points', 'DESC']],
    });
  
    const totalUsers = usersWithPoints.length;
    const divisionSize = Math.floor(totalUsers / 3);
  
    usersWithPoints.forEach((ranking, index) => {
      let division;
      if (index < divisionSize) {
        division = 1;
      } else if (index < 2 * divisionSize) {
        division = 2;
      } else {
        division = 3;
      }
  
      ranking.update({ division });
    });
  
    // Actualizar usuarios sin puntos
    await Ranking.update(
      { division: 4 }, // "No clasificado"
      { where: { points: 0 } }
    );
  }

// Función para añadir puntos a un usuario
export async function addPoints(userId: string, points: number) {
    const transaction = await sequelize.transaction();
  
    try {
      const ranking = await Ranking.findOne({ where: { user_id: userId }, transaction });
  
      if (ranking) {
        ranking.points += points;
        await ranking.save({ transaction });
  
        // Recalcular divisiones
        await assignDivisions();
      }
  
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error; // Maneja el error de forma adecuada
    }
  }