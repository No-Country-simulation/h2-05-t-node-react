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
    return match;
  } catch (error) {
    throw new Error(`Error al crear el partido: ${(error as Error).message}`);
  }
};

export const CreateMatches = async (data: matchInterface[]) => {
  try {
    // Recorremos para crear todos los partidos si no existen
    const createdMatches = await Promise.all(
      data.map(async (matchData) => {
        // Verificamos si el partido ya existe por match.id_apiMatch
        const existingMatch = await Match.findOne({
          where: { id_apiMatch: matchData.id_apiMatch },
        });

        if (existingMatch) {
          console.log(
            `El partido con ID ${matchData.id} ya existe, omitiendo creación.`
          );
          return existingMatch; // Retornamos el partido existente para omitir su creación
        }

        // Si el partido no existe, lo creamos
        const match = await Match.create(matchData);
        
        if (!match) {
          throw new Error(
            `Error al cargar el partido: ${JSON.stringify(matchData)}`
          );
        }
        return match;
      })
    );
    return createdMatches;
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
