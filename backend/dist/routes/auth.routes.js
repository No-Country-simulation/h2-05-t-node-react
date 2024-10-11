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
// Ruta de inicio de sesión con Google
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
// Ruta de callback después de la autenticación con Google
router.get("/google/callback", passport_1.default.authenticate("google", { session: false }), auth_controller_1.authController.googleAuthCallback);
// Ruta protegida que verifica el token
router.get("/verify-token", auth_controller_1.authController.verifyToken);
router.post('/logout', auth_controller_1.authController.logout);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map