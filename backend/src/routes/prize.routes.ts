import { Router } from "express";
import { createOnePrize, deleteOnePrize, getAllPrize, getOnePrize, updateOnePrize } from "../controllers/prize.controller";
/* import { adminAuthenticate } from "../middlewares/auth.middeware"; */

const router = Router();

router.get('', getAllPrize);
router.get('/:id', getOnePrize);
router.post('/createPrize', /* adminAuthenticate, */ createOnePrize);
router.delete('/:id', /* adminAuthenticate, */ deleteOnePrize);
router.put('/:id', /* adminAuthenticate, */ updateOnePrize);

/**
 * @swagger
 * tags:
 *   name: Prizes
 *   description: Operaciones relacionadas con premios
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Prize:
 *       type: object
 *       required:
 *         - type
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: ID del premio
 *         type:
 *           type: integer
 *           description: Tipo de premio (código numérico)
 *         description:
 *           type: string
 *           description: Descripción del premio
 *         image:
 *           type: string
 *           description: URL de la imagen del premio
 *         condition:
 *           type: string
 *           description: Condiciones para obtener el premio
 *         date:
 *           type: Date
 *           format: date-time
 *           description: Fecha de creación o asignación del premio
 *         rewardingDate:
 *           type: Date
 *           format: date-time
 *           description: Fecha de entrega del premio
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del premio
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de la última actualización del premio
 */

/**
 * @swagger
 * /prizes:
 *   get:
 *     summary: Obtiene todos los premios
 *     tags: [Prizes]
 *     responses:
 *       200:
 *         description: Lista de todos los premios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prize'
 *       500:
 *         description: Error en el servidor
 */
//router.get('/', getAllPrizes);

/**
 * @swagger
 * /prizes/{id}:
 *   get:
 *     summary: Obtiene un premio por ID
 *     tags: [Prizes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del premio
 *     responses:
 *       200:
 *         description: Premio obtenido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prize'
 *       404:
 *         description: Premio no encontrado
 *       500:
 *         description: Error en el servidor
 */
//router.get('/:id', getOnePrize);

/**
 * @swagger
 * /prizes/createPrize:
 *   post:
 *     summary: Crea un nuevo premio
 *     tags: [Prizes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prize'
 *     responses:
 *       201:
 *         description: Premio creado correctamente
 *       400:
 *         description: Error en los datos de entrada
 *       500:
 *         description: Error en el servidor
 */
//router.post('/createPrize', prizeValidator, handlePrizeValidationErrors, createOnePrize);

/**
 * @swagger
 * /prizes/{id}:
 *   delete:
 *     summary: Elimina un premio por ID
 *     tags: [Prizes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del premio a eliminar
 *     responses:
 *       200:
 *         description: Premio eliminado correctamente
 *       404:
 *         description: Premio no encontrado
 *       500:
 *         description: Error en el servidor
 */
//router.delete('/:id', deleteOnePrize);

/**
 * @swagger
 * /prizes/{id}:
 *   put:
 *     summary: Actualiza un premio por ID
 *     tags: [Prizes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del premio a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prize'
 *     responses:
 *       200:
 *         description: Premio actualizado correctamente
 *       404:
 *         description: Premio no encontrado
 *       500:
 *         description: Error en el servidor
 */
//router.put('/:id', updateOnePrize);


export default router;