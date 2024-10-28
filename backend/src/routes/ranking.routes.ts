import { Router } from 'express';
import { getRankingByDivision, getRankingByUserId } from '../controllers/ranking.controller';
import { populateRankingForExistingUsers } from '../services/user.service';

const router = Router();

/**
 * @swagger
 * /api/ranking/{id}/division:
 *   get:
 *     summary: Obtener ranking por ID de usuario
 *     description: Retorna la división en la que se encuentra el usuario según su ranking.
 *     tags: [Ranking]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: División obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 division:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error del servidor.
 */
router.get('/:id/division', getRankingByUserId);

/**
 * @swagger
 * /api/ranking/division/{division}:
 *   get:
 *     summary: Obtener rankings por división
 *     description: Obtiene todos los rankings de usuarios dentro de una división específica.
 *     tags: [Ranking]
 *     parameters:
 *       - in: path
 *         name: division
 *         schema:
 *           type: integer
 *           enum: [1, 2, 3, 4]
 *         required: true
 *         description: División a consultar (1, 2, 3, 4)
 *     responses:
 *       200:
 *         description: Lista de rankings obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: string
 *                   points:
 *                     type: integer
 *                   division:
 *                     type: integer
 *                   user:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *       400:
 *         description: División no válida.
 *       500:
 *         description: Error del servidor.
 */
router.get('/division/:division', getRankingByDivision);

/**
 * @swagger
 * /api/ranking/assignDivision:
 *   post:
 *     summary: Asignar divisiones a usuarios
 *     description: Asigna divisiones a todos los usuarios en función de sus puntos.
 *     tags: [Ranking]
 *     responses:
 *       200:
 *         description: Divisiones asignadas exitosamente.
 *       500:
 *         description: Error del servidor.
 */
router.post('/assignDivision', populateRankingForExistingUsers);

export default router;
