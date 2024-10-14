import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
//import { authService } from '../services/auth.service';
import dotenv from 'dotenv';

dotenv.config();

class AuthController {
  // Después de que Google autentica al usuario
  async googleAuthCallback(req: Request, res: Response) {
    const user = req.user as any;

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY as string, {
      expiresIn: '1h',
    });

    res.json({ token });
  }

  // Verificar el JWT en rutas protegidas
  async verifyToken(req: Request, res: Response) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY as string);
      res.status(200).json({ user: decoded });
    } catch (error) {
      res.status(403).json({ message: 'Token inválido' });
    }
  }

   logout  (req: Request, res: Response){
    res.clearCookie(process.env.PASS_COOKIE as string);
    res.status(200).redirect('http://localhost:5173');
  };
  
}

export const authController = new AuthController();
