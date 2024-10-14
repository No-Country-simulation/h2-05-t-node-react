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
exports.authController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//import { authService } from '../services/auth.service';
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class AuthController {
    // Después de que Google autentica al usuario
    googleAuthCallback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_KEY, {
                expiresIn: '1h',
            });
            res.json({ token });
        });
    }
    // Verificar el JWT en rutas protegidas
    verifyToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ message: 'No autorizado' });
            }
            const token = authHeader.split(' ')[1];
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                res.status(200).json({ user: decoded });
            }
            catch (error) {
                res.status(403).json({ message: 'Token inválido' });
            }
        });
    }
    logout(req, res) {
        res.clearCookie(process.env.PASS_COOKIE);
        res.status(200).redirect('http://localhost:5173');
    }
    ;
}
exports.authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map