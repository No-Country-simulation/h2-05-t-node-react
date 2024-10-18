"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserValidationErrors = exports.predicionValidator = void 0;
const express_validator_1 = require("express-validator");
exports.predicionValidator = [
    (0, express_validator_1.body)('user_id')
        .notEmpty()
        .trim()
        .withMessage("El id del usuario es obligatorio"),
    (0, express_validator_1.body)('type')
        .notEmpty()
        .trim()
        .withMessage("El tipo de prediccion es obligatoria"),
    (0, express_validator_1.body)('date')
        .notEmpty()
        .trim()
        .withMessage("La fecha es obligatoria")
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('La fecha debe ser válida'),
    (0, express_validator_1.body)('status')
        .notEmpty()
        .withMessage("El estatus es obligatorio")
        .isBoolean()
        .withMessage('El estatus es un booleano'),
    (0, express_validator_1.body)('team_a')
        .notEmpty()
        .trim()
        .withMessage("El equipo local es obligatorio"),
    (0, express_validator_1.body)('team_b')
        .notEmpty()
        .trim()
        .withMessage("El equipo visitante es obligatorio"),
    (0, express_validator_1.body)('match_date')
        .notEmpty()
        .trim()
        .withMessage("La fecha del partido es obligatoria")
        .isDate({ format: 'YYYY-MM-DD' })
        .withMessage('La fecha debe ser válida'),
    (0, express_validator_1.body)('id_apiMatch')
        .notEmpty()
        .trim()
        .withMessage("El id de la api es obligatorio"),
    (0, express_validator_1.body)('league_id')
        .notEmpty()
        .trim()
        .withMessage("El id de la liga es obligatorio"),
    (0, express_validator_1.body)('prediction')
        .notEmpty()
        .trim()
        .withMessage("La predicción es obligatoria"),
    (0, express_validator_1.body)('fee')
        .notEmpty()
        .trim()
        .withMessage("El fee es obligatorio"),
];
const handleUserValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.handleUserValidationErrors = handleUserValidationErrors;
//# sourceMappingURL=prediction.validator.js.map