import { Request, Response } from "express";
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from "../services/user.service";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

export const getOneUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await getUser(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

export const createOneUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user.msg);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

export const deleteOneUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);
    res.status(200).json(user.msg);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

export const updateOneUser = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await updateUser(id, req.body);
        res.status(200).json(user.msg);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
  }