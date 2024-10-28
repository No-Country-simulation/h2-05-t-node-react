import { userInterface } from "../interfaces/user.interface";
import { Ranking } from "../models/ranking.model";
import { User } from "../models/user.model";

export const getUsers = async (): Promise<User[]> => {
  try {
    const user = await User.findAll();
    if (!user) throw new Error("Usuarios no encontrados");
    return user;
  } catch (error) {
    throw new Error(
      `Error al obtener los usuarios: ${(error as Error).message}`
    );
  }
};

export const getUser = async (id: any): Promise<User> => {
  try {
    const user = await User.findOne({
      where: { id },
      include: [
        {
          model: Ranking,
          attributes: ["points", "division"],
        },
      ],
    });

    if (!user) throw new Error("Usuario no encontrado");
    return user;
  } catch (error) {
    throw new Error(`Error al obtener el usuario: ${(error as Error).message}`);
  }
};

export const createUser = async (data: userInterface): Promise<any> => {
  try {
    const user = await User.create(data);
    if (!user) throw new Error("Usuario no creado");
    // Crear un registro en la tabla de Ranking con 0 puntos por defecto
    await Ranking.create({
      user_id: user.id, // Usa el ID del usuario recién creado
      points: 0,       // Puntos iniciales (opcional)
      division: 4,     // División inicial (opcional)
    });

    return { msg: "Usuario creado" };
  } catch (error) {
    throw new Error(`Error al crear el usuario: ${(error as Error).message}`);
  }
};


export const populateRankingForExistingUsers = async () => {
  try {
    // Obtener todos los usuarios que no tienen un registro en la tabla Ranking
    const usersWithoutRanking = await User.findAll({
      include: [
        {
          model: Ranking,
          required: false, // Esto asegura que también traiga usuarios sin ranking
        },
      ],
      where: { "$Ranking.user_id$": null }, // Solo usuarios sin ranking
    });

    // Crear un ranking para cada usuario sin uno
    for (const user of usersWithoutRanking) {
      if (!user.id) {
        throw new Error("El user_id no está definido");
      }
      // Crear el registro en Ranking sin casting
      await Ranking.create({
        user_id: user.id, // Usa el ID del usuario recién creado
        points: 0,       // Puntos iniciales (opcional)
        division: 4,     // División inicial (opcional)
      });
    }

    console.log("Ranking inicializado para usuarios existentes.");
  } catch (error) {
    console.error(
      `Error al inicializar el ranking: ${(error as Error).message}`
    );
  }
};

export const deleteUser = async (id: any): Promise<any> => {
  try {
    const user = await User.destroy({ where: { id: id } });
    if (!user) throw new Error("Usuario no eliminado");
    return { msg: "Usuario eliminado" };
  } catch (error) {
    throw new Error(
      `Error al eliminar el usuario: ${(error as Error).message}`
    );
  }
};

export const updateUser = async (id: any, data: any): Promise<any> => {
  try {
    const user = await User.update(data, { where: { id: id } });
    if (!user) throw new Error("Usuario no actualizado");
    return { msg: "Usuario actualizado" };
  } catch (error) {
    throw new Error(
      `Error al eliminar el usuario: ${(error as Error).message}`
    );
  }
};
