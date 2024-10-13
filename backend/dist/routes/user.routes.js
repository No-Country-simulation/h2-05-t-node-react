"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const user_validator_1 = require("../middlewares/user.validator");
const auth_middeware_1 = require("../middlewares/auth.middeware");
const router = (0, express_1.Router)();
router.get("/", user_controller_1.getAllUsers);
router.get("/:id", user_controller_1.getOneUser);
router.post("/createUser", user_validator_1.userValidator, user_validator_1.handleUserValidationErrors, user_controller_1.createOneUser);
router.post("/login", user_controller_1.login);
router.delete("/:id", auth_middeware_1.authenticateToken, user_controller_1.deleteOneUser);
router.put("/:id", auth_middeware_1.authenticateToken, user_controller_1.updateOneUser);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operaciones relacionadas con usuarios
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - username
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: ID del usuario
 *         username:
 *           type: string
 *           description: Nombre de usuario
 *         email:
 *           type: string
 *           description: Correo electrónico
 *         password:
 *           type: string
 *           description: Contraseña del usuario (encriptada)
 *         rol:
 *           type: string
 *           description: Rol del usuario
 *         photo:
 *           type: string
 *           description: URL de la foto del usuario
 *         total_predictions:
 *           type: integer
 *           description: Total de predicciones hechas por el usuario
 *         subscription:
 *           type: string
 *           description: Tipo de suscripción del usuario
 *         registration_date:
 *           type: string
 *           format: date-time
 *           description: Fecha de registro del usuario
 */
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de todos los usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error en el servidor
 */
// router.get('/', getAllUsers);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
//router.get('/:id', getOneUser);
/**
 * @swagger
 * /users/createUser:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Error en los datos de entrada
 *       500:
 *         description: Error en el servidor
 */
//router.post('/createUser', userValidator, handleUserValidationErrors, createOneUser);
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Inicia sesión un usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *                 example: "usuario@example.com"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error en el servidor
 */
//router.post('/login', login);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
//router.delete('/:id', authenticateToken, deleteOneUser);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualiza un usuario por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
//router.put('/:id', authenticateToken, updateOneUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map