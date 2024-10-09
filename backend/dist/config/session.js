"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = void 0;
const express_session_1 = __importDefault(require("express-session"));
const connect_session_sequelize_1 = __importDefault(require("connect-session-sequelize"));
// Importa tu instancia de Sequelize
const database_1 = __importDefault(require("./database")); // Asegúrate de que la ruta sea correcta
const SequelizeStore = (0, connect_session_sequelize_1.default)(express_session_1.default.Store); // Inicializa el almacén con express-session
// Inicializa el almacén de sesiones con Sequelize
const sessionStore = new SequelizeStore({
    db: database_1.default,
});
exports.sessionMiddleware = (0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'default_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: true, // Asegúrate de que tu aplicación está usando HTTPS
        sameSite: 'none', // Necesario para CORS en entornos desacoplados
        maxAge: 1000 * 60 * 60 * 24, // 1 día
    },
});
// Sincroniza el almacén de sesiones para crear la tabla si no existe
sessionStore.sync();
//# sourceMappingURL=session.js.map