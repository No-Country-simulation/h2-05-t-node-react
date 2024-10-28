"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prediction_controller_1 = require("../controllers/prediction.controller");
const prediction_validator_1 = require("../middlewares/prediction.validator");
const router = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *   schemas:
 *     Prediction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID de la predicción
 *         user_id:
 *           type: string
 *           description: ID del usuario asociado
 *         type:
 *           type: string
 *           enum: [simple, chained]
 *           description: Tipo de predicción
 *         bet_points:
 *           type: integer
 *           description: Puntos apostados
 *         date:
 *           type: string
 *           format: date-time
 *           description: Fecha de la predicción
 *         status:
 *           type: string
 *           description: Estado de la predicción
 *         total_points:
 *           type: integer
 *           description: Puntos totales acumulados
 */
/**
 * @swagger
 * /api/prediction:
 *   get:
 *     summary: Obtiene todas las predicciones
 *     tags: [Predictions]
 *     responses:
 *       200:
 *         description: Lista de todas las predicciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prediction'
 */
router.get('', prediction_controller_1.getAllPredictions);
/**
 * @swagger
 * /api/prediction/{id}:
 *   get:
 *     summary: Obtiene una predicción por ID
 *     tags: [Predictions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la predicción
 *     responses:
 *       200:
 *         description: Predicción obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prediction'
 *       404:
 *         description: Predicción no encontrada
 */
router.get('/:id', prediction_controller_1.getOnePrediction);
/**
 * @swagger
 * /api/prediction/createPrediction:
 *   post:
 *     summary: Crea una nueva predicción
 *     tags: [Predictions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prediction'
 *     responses:
 *       201:
 *         description: Predicción creada exitosamente
 */
//router.post('/createPrediction',predicionValidator, handleUserValidationErrors, postCreatePrediction);
router.post('/createPrediction', prediction_validator_1.handleUserValidationErrors, prediction_controller_1.postCreatePrediction);
/**
 * @swagger
 * /api/prediction/{id}:
 *   delete:
 *     summary: Elimina una predicción por ID
 *     tags: [Predictions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la predicción
 *     responses:
 *       200:
 *         description: Predicción eliminada
 *       404:
 *         description: Predicción no encontrada
 */
router.delete('/:id', prediction_controller_1.deleteOnePrediction);
/**
 * @swagger
 * /api/prediction/{id}:
 *   put:
 *     summary: Actualiza una predicción por ID
 *     tags: [Predictions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la predicción
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prediction'
 *     responses:
 *       200:
 *         description: Predicción actualizada exitosamente
 *       404:
 *         description: Predicción no encontrada
 */
router.put('/:id', prediction_controller_1.updateOnePrediction);
exports.default = router;
//# sourceMappingURL=prediction.routes.js.map