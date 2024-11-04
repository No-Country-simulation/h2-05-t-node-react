"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthenticate = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_service_1 = require("../services/user.service");
// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Acceso denegado, token requerido' });
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY || 'secret');
        req.user = verified; // Asignar usuario verificado al request
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Token inválido' });
    }
};
exports.authenticateToken = authenticateToken;
const adminAuthenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: 'Acceso denegado, token requerido' });
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY || 'secret');
        const admin = yield (0, user_service_1.getUser)(verified.id);
        if (admin.rol != 'admin') {
            return res.status(401).json({ message: 'Acceso denegado, solo el administrador puede acceder' });
        }
        next();
    }
    catch (error) {
        res.status(403).json({ message: 'Token inválido' });
    }
});
exports.adminAuthenticate = adminAuthenticate;
/* import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'No estás autenticado' });
};
 */ 
//# sourceMappingURL=auth.middeware.js.map