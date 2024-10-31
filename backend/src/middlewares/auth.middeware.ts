import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getUser } from '../services/user.service';

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

export const adminAuthenticate = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Acceso denegado, token requerido' });

  try {
    const verified: any = jwt.verify(token, process.env.JWT_KEY || 'secret');
    const admin = await getUser(verified.id);
    if(admin.rol != 'admin'){
      return res.status(401).json({ message: 'Acceso denegado, solo el administrador puede acceder' });
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token inválido' });
  }
}

/* import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'No estás autenticado' });
};
 */