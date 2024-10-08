import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const userValidator = [
  body("username")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio"),
  body("email")
    .isEmail()
    .withMessage("Formato de correo invalido")
    .notEmpty()
    .withMessage("El email es obligatorio"),
  body("password")
    .notEmpty()
    .withMessage("El contraseña es obligatorio")
    .isLength({ min: 6 })
    .withMessage("Dabe tener al menos 6 caracteres")
    .matches(/[\W_]/)
    .withMessage("Debe contener al menos un caracter especial"),
];

export const handleUserValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
