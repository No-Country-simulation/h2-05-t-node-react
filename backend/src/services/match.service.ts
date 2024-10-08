import { Match } from "../models/match.model";
import { matchInterface } from "../interfaces/match.interface";

export const getMatches = async () => {
  try {
    const match = await Match.findAll();
    if (!match) throw new Error("Partidos no encontrados");
    return match;
  } catch (error) {
    throw new Error(
      `Error al obtener los partidos: ${(error as Error).message}`
    );
  }
};

export const getMatchById = async (id: any) => {
  try {
    const match = await Match.findOne(id);
    if (!match) throw new Error("Partido no encontrado");
    return match;
  } catch (error) {
    throw new Error(`Error al obtener el partido: ${(error as Error).message}`);
  }
};

export const CreateOneMatch = async (data: matchInterface) => {
  try {
    const match = await Match.create(data);
    if (!match) throw new Error("Partido no creado");
    return { msg: "Partido creado" };
  } catch (error) {
    throw new Error(`Error al crear el partido: ${(error as Error).message}`);
  }
};

export const deleteOneMatch = async (id: any) => {
  try {
    const match = await Match.destroy({ where: { id: id } });
    if (!match) throw new Error("Partido no eliminado");
    return { msg: "Partido eliminado" };
  } catch (error) {
    throw new Error(
      `Error al eliminar el partido: ${(error as Error).message}`
    );
  }
};

export const updateOneMatch = async (id: any, data: any) => {
  try {
    const match = await Match.update(data, { where: { id: id } });
    if (!match) throw new Error("Partido no actualizado");
    return { msg: "Partido actualizado" };
  } catch (error) {
    throw new Error(
      `Error al actualizar el partido: ${(error as Error).message}`
    );
  }
};
