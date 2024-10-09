import { Router } from "express";
import passport from "passport";
import { authController } from "../controllers/auth.controller";
//import { authenticateToken } from '../middlewares/auth.middeware';

const router = Router();

// Ruta de inicio de sesión con Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Ruta de callback después de la autenticación con Google
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  authController.googleAuthCallback
);

// Ruta protegida que verifica el token
router.get("/verify-token", authController.verifyToken);

router.post('/logout', authController.logout);

export default router;