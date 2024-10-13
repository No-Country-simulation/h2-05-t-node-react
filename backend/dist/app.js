"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
require("./config/passportConfig");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const api_routes_1 = __importDefault(require("./routes/api.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const match_routes_1 = __importDefault(require("./routes/match.routes"));
const ranking_routes_1 = __importDefault(require("./routes/ranking.routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const cors_1 = __importDefault(require("cors"));
const prediction_routes_1 = __importDefault(require("./routes/prediction.routes"));
const predictionRecord_routes_1 = __importDefault(require("./routes/predictionRecord.routes"));
const swaggerConfig_1 = __importDefault(require("./config/swaggerConfig"));
const app = (0, express_1.default)();
app.use(errorHandler_1.errorHandler);
app.use((0, cors_1.default)());
// Inicializar Passport
app.use(passport_1.default.initialize());
// Configurar Swagger
(0, swaggerConfig_1.default)(app);
// Middlewares globales
app.use(express_1.default.json()); // Para parsear JSON
app.use(express_1.default.urlencoded({ extended: false })); // Para parsear URL-encoded
app.use("/auth", auth_routes_1.default);
app.use("/api/ranking", ranking_routes_1.default);
app.use("/api/", predictionRecord_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/match", match_routes_1.default);
app.use("/api/prediction", prediction_routes_1.default);
app.use("", api_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map