import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
    user?: string | jwt.JwtPayload;
  }
// Middleware para verificar el token JWT
export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Acceso denegado, token requerido' });

  try {
    const verified = jwt.verify(token, process.env.JWT_KEY || 'secret');
    req.user = verified; // Asignar usuario verificado al request
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token inválido' });
  }
};
