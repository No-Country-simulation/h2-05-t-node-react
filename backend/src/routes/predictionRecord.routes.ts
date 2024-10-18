import { Router } from 'express';
import { getPredictionHistoryByUser } from '../controllers/predictionRecord.controller';

const router = Router();

/**
 * @swagger
 * /api/prediction/predictionHistory:
 *   get:
 *     tags:
 *       - Predicciones
 *     summary: Obtener historial de predicciones de un usuario
 *     description: Devuelve el historial de predicciones de un usuario aplicando filtros opcionales como estado, rango de fechas y paginación.
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Filtros para el historial de predicciones
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               description: ID del usuario
 *               example: "123e4567-e89b-12d3-a456-426614174000"
 *             filters:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: Estado de la predicción ('ganada', 'perdida', etc.)
 *                   example: "ganada"
 *                 startDate:
 *                   type: string
 *                   format: date
 *                   description: Fecha de inicio para filtrar predicciones
 *                   example: "2023-01-01"
 *                 endDate:
 *                   type: string
 *                   format: date
 *                   description: Fecha de fin para filtrar predicciones
 *                   example: "2023-12-31"
 *                 page:
 *                   type: integer
 *                   description: Número de la página para la paginación
 *                   example: 1
 *     responses:
 *       200:
 *         description: Historial de predicciones recuperado exitosamente
 *         schema:
 *           type: object
 *           properties:
 *             results:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   total_points:
 *                     type: integer
 *                     description: Puntos totales ganados en la predicción
 *                   status:
 *                     type: string
 *                     description: Estado de la predicción
 *             totalPages:
 *               type: integer
 *               description: Número total de páginas
 *             currentPage:
 *               type: integer
 *               description: Página actual
 *       400:
 *         description: Solicitud incorrecta. Error en los parámetros enviados.
 *       500:
 *         description: Error interno en el servidor.
 */

router.get('/predictionHistory', getPredictionHistoryByUser);

export default router;
