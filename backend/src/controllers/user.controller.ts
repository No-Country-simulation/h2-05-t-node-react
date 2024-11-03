import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from "../services/user.service";
import { httpResponse } from "../utils/enumsErrors";
import { userInterface } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import { getPredictionQuota } from "../services/prediction_quota.service";

const HttpResponse = new httpResponse();

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    if (!users)
      return HttpResponse.DATA_BASE_ERROR(res, "Usuarios no encontrados");
    return HttpResponse.OK(res, users);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const getOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return HttpResponse.INVALID_TYPE_ERROR(res, "ID de usuario no válido");
    }
    const user = await getUser(id);
    if (!user)
      return HttpResponse.DATA_BASE_ERROR(res, "Usuario no encontrado");
    return HttpResponse.OK(res, user);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const createOneUser = async (req: Request, res: Response) => {
  try {
    const data = req.body as userInterface;
    if (typeof data.password !== "string") {
      return HttpResponse.Error(res, "Password must be a string");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const user = await createUser(data);
    if (!user)
      return HttpResponse.DATA_BASE_ERROR(res, "Error al cargar los datos");
    return HttpResponse.OK(res, user.msg);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const deleteOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);
    if (!user)
      return HttpResponse.DATA_BASE_ERROR(res, "Error al eliminar el usuario");
    return HttpResponse.OK(res, user.msg);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const updateOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }
    const user = await updateUser(id, req.body);
    if (!user)
      return HttpResponse.DATA_BASE_ERROR(
        res,
        "Error al actualizar el usuario"
      );
    return HttpResponse.OK(res, user.msg);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const JWT_KEY = process.env.JWT_KEY;
    const { email, password }: { email: string; password: string } = req.body;
    //console.log(req.body);
    
    if (!(email && password)) {
      return HttpResponse.INVALID_TYPE_ERROR(
        res,
        "Email y contraseña son obligatorios"
      );
    }

    const user = await User.findOne({where:{email:email}});
    //console.log(user);
    
    if (!user) {
      return HttpResponse.INVALID_TYPE_ERROR(
        res,
        "Usuario no encontrado"
      );
    }
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return HttpResponse.INVALID_TYPE_ERROR(res, "contraseña invalidos");
    }
    const id = user.id;
     const today = new Date();
     //const todayString = today.toISOString().split("T")[0]; // Formatear la fecha en 'YYYY-MM-DD'

    // Verificar cuántas predicciones disponibles tiene el usuario para hoy
    let predictionQuota = await getPredictionQuota(id, today);

    const token = jwt.sign({ email, id }, JWT_KEY!, {
      expiresIn: "24h",
    });
    const response = {
      token: token,
      quota: predictionQuota,
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
        rol: user.rol,
        photo: user.photo,
        total_predictions: user.total_predictions,
        subscription: user.subscription,
        registration_date: user.registration_date,
      },
    };
    return HttpResponse.OK(res, response);
  } catch (error) {
    return HttpResponse.Error(res, (error as Error).message);
  }
};
