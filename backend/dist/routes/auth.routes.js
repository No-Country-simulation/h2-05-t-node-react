"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = require("../controllers/auth.controller");
//import { authenticateToken } from '../middlewares/auth.middeware';
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestión de autenticación
 */
/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Iniciar sesión con Google
 *     tags: [Auth]
 *     description: Redirige al usuario a Google para la autenticación.
 *     responses:
 *       302:
 *         description: Redirige a la página de autenticación de Google.
 */
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Callback de autenticación con Google
 *     tags: [Auth]
 *     description: Recibe la respuesta de Google después de la autenticación y genera un token JWT.
 *     responses:
 *       200:
 *         description: Autenticación exitosa, retorna el token JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT generado para el usuario.
 *       401:
 *         description: Autenticación fallida.
 */
router.get("/google/callback", passport_1.default.authenticate("google", { session: false }), auth_controller_1.authController.googleAuthCallback);
/**
 * @swagger
 * /auth/verify-token:
 *   get:
 *     summary: Verificar token JWT
 *     tags: [Auth]
 *     description: Verifica la validez de un token JWT enviado en los encabezados de la solicitud.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Token JWT en formato `Bearer {token}`.
 *     responses:
 *       200:
 *         description: Token válido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: Información del usuario decodificada del token.
 *       401:
 *         description: No autorizado, token faltante o inválido.
 *       403:
 *         description: Token inválido.
 */
router.get("/verify-token", auth_controller_1.authController.verifyToken);
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Cerrar sesión
 *     tags: [Auth]
 *     description: Cierra la sesión del usuario y elimina la cookie de autenticación, Este endpoint no requiere parámetros. Simplemente elimina la cookie que mantiene la sesión activa. En este caso, el controlador (authController.logout) se encarga de limpiar la cookie.
 *     responses:
 *       200:
 *         description: Sesión cerrada correctamente y redirecciona a la página de inicio.
 */
router.post('/logout', auth_controller_1.authController.logout);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map