import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const predicionValidator = [
    body('user_id')
    .notEmpty()
    .trim()
    .withMessage("El id del usuario es obligatorio"),
    body('type')
    .notEmpty()
    .trim()
    .withMessage("El tipo de prediccion es obligatoria"),
    body('date')
    .notEmpty()
    .trim()
    .withMessage("La fecha es obligatoria")
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('La fecha debe ser válida'),
    body('status')
    .notEmpty()
    .withMessage("El estatus es obligatorio")
    .isBoolean()
    .withMessage('El estatus es un booleano'),
]

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

