"use strict";
/**
 * @swagger
 * tags:
 *   name: Matches
 *   description: Gestión de partidos
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const match_controller_1 = require("../controllers/match.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/match:
 *   get:
 *     summary: Obtiene todos los partidos
 *     tags: [Matches]
 *     responses:
 *       200:
 *         description: Lista de partidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Match'
 *       500:
 *         description: Error al obtener los partidos
 */
router.get('/', match_controller_1.getAllMatches);
/**
 * @swagger
 * /api/match/{id}:
 *   get:
 *     summary: Obtiene un partido por su ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del partido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Partido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Match'
 *       404:
 *         description: Partido no encontrado
 */
router.get('/:id', match_controller_1.getOneMatch);
/**
 * @swagger
 * /api/match:
 *   post:
 *     summary: Crea un nuevo partido
 *     tags: [Matches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team_a:
 *                 type: string
 *                 description: Nombre del equipo A
 *               team_b:
 *                 type: string
 *                 description: Nombre del equipo B
 *               match_date:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora del partido
 *               result:
 *                 type: string
 *                 description: Resultado del partido (opcional)
 *               status:
 *                 type: string
 *                 enum: [scheduled, in_progress, completed]
 *                 description: Estado del partido (opcional)
 *               lige_id:
 *                 type: string
 *                 description: ID de la liga asociada
 *               id_apiMatch:
 *                 type: string
 *                 description: ID del partido desde una API externa
 *     responses:
 *       201:
 *         description: Partido creado
 *       400:
 *         description: Error al crear el partido
 */
router.post('/', match_controller_1.createMatch);
/**
 * @swagger
 * /api/match/{id}:
 *   delete:
 *     summary: Elimina un partido por su ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del partido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Partido eliminado
 *       404:
 *         description: Partido no encontrado
 */
router.delete('/:id', match_controller_1.deleteMatch);
/**
 * @swagger
 * /api/match/{id}:
 *   put:
 *     summary: Actualiza un partido por su ID
 *     tags: [Matches]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del partido
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               team_a:
 *                 type: string
 *                 description: Nombre del equipo A (opcional)
 *               team_b:
 *                 type: string
 *                 description: Nombre del equipo B (opcional)
 *               match_date:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha y hora del partido (opcional)
 *               result:
 *                 type: string
 *                 description: Resultado del partido (opcional)
 *               status:
 *                 type: string
 *                 enum: [scheduled, in_progress, completed]
 *                 description: Estado del partido (opcional)
 *               lige_id:
 *                 type: string
 *                 description: ID de la liga asociada (opcional)
 *               id_apiMatch:
 *                 type: string
 *                 description: ID del partido desde una API externa (opcional)
 *     responses:
 *       200:
 *         description: Partido actualizado
 *       404:
 *         description: Partido no encontrado
 */
router.put('/:id', match_controller_1.updateMatch);
exports.default = router;
/**
 * @swagger
 * components:
 *   schemas:
 *     Match:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID del partido
 *         team_a:
 *           type: string
 *           description: Nombre del equipo A
 *         team_b:
 *           type: string
 *           description: Nombre del equipo B
 *         match_date:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora del partido
 *         result:
 *           type: string
 *           description: Resultado del partido
 *         status:
 *           type: string
 *           enum: [scheduled, in_progress, completed]
 *           description: Estado del partido
 *         lige_id:
 *           type: string
 *           description: ID de la liga asociada
 *         id_apiMatch:
 *           type: string
 *           description: ID del partido desde una API externa
 */
//# sourceMappingURL=match.routes.js.map