import express from "express";
import passport from "passport";
import "./config/passportConfig";
import authRoutes from "./routes/auth.routes";
import apiRoutes from "./routes/api.routes";
import userRoutes from "./routes/user.routes";
import matchRoutes from "./routes/match.routes";
import rankingRoutes from "./routes/ranking.routes";
import prizeRouter from "./routes/prize.routes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
import predictionRouter from "./routes/prediction.routes";
import './cron/adjustPredictionsCron';
import predictionRecordRoutes from "./routes/predictionRecord.routes";
import swaggerConfig from "./config/swaggerConfig";
import './cron/cron.module';

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json()); // Parsear JSON
app.use(express.urlencoded({ extended: false })); // Parsear URL-encoded
app.use(passport.initialize()); // Inicializar Passport

// Configurar Swagger
swaggerConfig(app);

// Rutas de la aplicación
app.use("/auth", authRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/prediction-record", predictionRecordRoutes);
app.use("/api/users", userRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/prediction", predictionRouter);
app.use("/api/prize", prizeRouter);
app.use("/", apiRoutes); // Ruta general o fallback

// Manejo de errores
app.use(errorHandler);

export default app;