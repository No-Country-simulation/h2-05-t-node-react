import { PrizeInterface } from "../interfaces/prize.interface";
import { Prize } from "../models/prize.model";

export const getPrize = async () => {
  try {
    const prize = await Prize.findAll();
    if (!prize) {
      throw new Error("Premios no encontrados");
    }
    return prize;
  } catch (error) {
    throw new Error(
      `Error al obtener los premios: ${(error as Error).message}`
    );
  }
};

export const getPrizeById = async (id: any) => {
  try {
    const prize = await Prize.findOne({ where: { id: id } });
    if (!prize) {
      throw new Error("Premio no encontrado");
    }
    return prize;
  } catch (error) {
    throw new Error(`Error al obtener el premio: ${(error as Error).message}`);
  }
};

export const createPrize = async (data: PrizeInterface) => {
  try {
    const prize = await Prize.create(data);
    if (!prize) {
      throw new Error("Error al crear el premio");
    }
    return { data: prize, msg: "Premio creado" };
  } catch (error) {
    throw new Error(`Error al crear el premio: ${(error as Error).message}`);
  }
};

export const deletePrize = async (id: any) => {
  try {
    const prize = await Prize.destroy({ where: { id: id } });
    if (!prize) {
        throw new Error("Error al eliminar el premio");
    }
    return { msg: "Premio eliminado" };
  } catch (error) {
    throw new Error(`Error al eliminar el premio: ${(error as Error).message}`);
  }
};

export const updatePrize = async (id:any, data: any) => {
    try {
        const prize = await Prize.update(data, { where: { id: id } });
        if (!prize) {
            throw new Error("Error al actualizar el premio");
        }
        return { data: prize, msg: "Premio actualizado" };
    } catch (error) {
        throw new Error(`Error al actualizar el premio: ${(error as Error).message}`);
    }
}