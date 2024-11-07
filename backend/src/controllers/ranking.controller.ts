import { Ranking } from "../models/ranking.model";
import { User } from "../models/user.model";
import { Request, Response } from "express";
//import { populateRankingForExistingUsers } from "../services/user.service";
import { assignDivisions } from "../services/ranking.service";

export const getRankingByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const ranking = await Ranking.findOne({
      where: { user_id: userId },
      attributes: ["division"],
    });

    if (!ranking) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json({ division: ranking.division });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
export const postAsignDivision = async (req: Request, res: Response) => {
  try {
    const ranking = await assignDivisions();

    res.status(200).json({ ranking });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

export const getRankingByDivision = async (req: Request, res: Response) => {
  try {
    const division = parseInt(req.params.division, 10);

    if (![1, 2, 3, 4].includes(division)) {
      return res.status(400).json({ message: "División no válida" });
    }

    const rankings = await Ranking.findAll({
      where: { division },
      include: {
        model: User, // Incluir el modelo Match
        attributes: ["id", "username"],
      }, // para incluir la información del usuario
      order: [["points", "DESC"]],
      attributes: ["id", "points"],
    });

    res.json(rankings);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
