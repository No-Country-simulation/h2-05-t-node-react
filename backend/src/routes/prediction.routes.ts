import { Router } from 'express';
import { deleteOnePrediction, getAllPredictions, getOnePrediction, postCreatePrediction, updateOnePrediction } from '../controllers/prediction.controller';
import { handleUserValidationErrors } from '../middlewares/prediction.validator';

const router = Router();

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
router.get('', getAllPredictions);

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
router.get('/:id', getOnePrediction);

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
router.post('/createPrediction', handleUserValidationErrors, postCreatePrediction);

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
router.delete('/:id', deleteOnePrediction);

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
router.put('/:id', updateOnePrediction);

export default router;
