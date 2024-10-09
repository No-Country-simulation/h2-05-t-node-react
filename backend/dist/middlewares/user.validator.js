"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserValidationErrors = exports.userValidator = void 0;
const express_validator_1 = require("express-validator");
exports.userValidator = [
    (0, express_validator_1.body)("username").notEmpty().withMessage("El nombre de usuario es obligatorio"),
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Formato de correo invalido")
        .notEmpty()
        .withMessage("El email es obligatorio"),
    (0, express_validator_1.body)("password")
        .notEmpty()
        .withMessage("El contraseña es obligatorio")
        .isLength({ min: 6 })
        .withMessage("Dabe tener al menos 6 caracteres")
        .matches(/[\W_]/)
        .withMessage("Debe contener al menos un caracter especial"),
];
const handleUserValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.handleUserValidationErrors = handleUserValidationErrors;
//# sourceMappingURL=user.validator.js.map