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
/* import './cron/cron.module'; */

const app = express();

app.use(errorHandler);
app.use(cors());

// Inicializar Passport
app.use(passport.initialize());

// Configurar Swagger
swaggerConfig(app);

// Middlewares globales
app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: false })); // Para parsear URL-encoded

app.use("/auth", authRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/", predictionRecordRoutes);
app.use("/api/users", userRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/prediction", predictionRouter);
app.use("/api/prize", prizeRouter);
app.use("", apiRoutes);

export default app;
