"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_controller_1 = require("../controllers/auth.controller");
const router = (0, express_1.Router)();
// Ruta para iniciar el login con Google
router.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
// Ruta de callback de Google OAuth
router.get('/google/callback', passport_1.default.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
});
// Ruta para obtener el perfil de usuario
router.get('/profile', auth_controller_1.authController.loginSuccess);
// Ruta para cerrar sesión
router.get('/logout', auth_controller_1.authController.logout);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map