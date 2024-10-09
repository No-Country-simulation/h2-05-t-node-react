"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
database_1.default.sync({ alter: true }) // false para no sobrescribir tablas
    .then(() => {
    console.log('Base de datos sincronizada');
    app_1.default.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
})
    .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
});
//# sourceMappingURL=server.js.map