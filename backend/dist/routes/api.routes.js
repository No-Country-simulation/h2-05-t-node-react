"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_controller_1 = require("../controllers/api.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: API
 *   description: Rutas para la obtención de datos de la API externa EN DESARROLLO
 */
/**
 * @swagger
 * /api_match:
 *   get:
 *     summary: Obtiene información de los partidos
 *     tags: [API]
 *     responses:
 *       200:
 *         description: Lista de partidos obtenidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del partido
 *                   name:
 *                     type: string
 *                     description: Nombre del partido
 *                   date:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora del partido
 *                   location:
 *                     type: string
 *                     description: Ubicación del partido
 *       500:
 *         description: Error al obtener los partidos
 */
router.get('/api_match', api_controller_1.getMatchApi);
/**
 * @swagger
 * /api_record:
 *   get:
 *     summary: Obtiene registros
 *     tags: [API]
 *     responses:
 *       200:
 *         description: Lista de registros obtenidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del registro
 *                   description:
 *                     type: string
 *                     description: Descripción del registro
 *       500:
 *         description: Error al obtener los registros
 */
router.get('/api_record', api_controller_1.getRecord);
/**
 * @swagger
 * /api_country:
 *   get:
 *     summary: Obtiene información de los países
 *     tags: [API]
 *     responses:
 *       200:
 *         description: Lista de países obtenidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del país
 *                   name:
 *                     type: string
 *                     description: Nombre del país
 *       500:
 *         description: Error al obtener los países
 */
router.get('/api_country', api_controller_1.getCountriesApi);
/**
 * @swagger
 * /api_league:
 *   get:
 *     summary: Obtiene información de las ligas
 *     tags: [API]
 *     responses:
 *       200:
 *         description: Lista de ligas obtenidas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la liga
 *                   name:
 *                     type: string
 *                     description: Nombre de la liga
 *       500:
 *         description: Error al obtener las ligas
 */
router.get('/api_league', api_controller_1.getLeagueApi);
/**
 * @swagger
 * /api_team:
 *   get:
 *     summary: Obtiene información de los equipos
 *     tags: [API]
 *     responses:
 *       200:
 *         description: Lista de equipos obtenidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del equipo
 *                   name:
 *                     type: string
 *                     description: Nombre del equipo
 *       500:
 *         description: Error al obtener los equipos
 */
router.get('/api_team', api_controller_1.getTeamApi);
/**
 * @swagger
 * /api_players:
 *   get:
 *     summary: Obtiene información de los jugadores
 *     tags: [API]
 *     responses:
 *       200:
 *         description: Lista de jugadores obtenidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del jugador
 *                   name:
 *                     type: string
 *                     description: Nombre del jugador
 *       500:
 *         description: Error al obtener los jugadores
 */
router.get('/api_players', api_controller_1.getPlayerApi);
/**
 * @swagger
 * /api_Oneplayers:
 *   get:
 *     summary: Obtiene información de un jugador específico
 *     tags: [API]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID del jugador
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jugador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del jugador
 *                 name:
 *                   type: string
 *                   description: Nombre del jugador
 *       404:
 *         description: Jugador no encontrado
 *       500:
 *         description: Error al obtener el jugador
 */
router.get('/api_Oneplayers', api_controller_1.getOnePlayerApi);
exports.default = router;
//# sourceMappingURL=api.routes.js.map