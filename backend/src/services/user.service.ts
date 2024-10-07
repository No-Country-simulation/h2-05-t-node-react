import { userInterface } from "../interfaces/user.interface";
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
    const user = await User.findOne(id);
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
    return { msg: "Usuario creado" };
  } catch (error) {
    throw new Error(`Error al crear el usuario: ${(error as Error).message}`);
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
