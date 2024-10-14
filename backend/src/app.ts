import express from "express";
import passport from "passport";
import "./config/passportConfig";
import authRoutes from "./routes/auth.routes";
import apiRoutes from "./routes/api.routes";
import userRoutes from "./routes/user.routes";
import matchRoutes from "./routes/match.routes";
import rankingRoutes from "./routes/ranking.routes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
import predictionRouter from "./routes/prediction.routes";
import './cron/adjustPredictionsCron';

const app = express();

app.use(errorHandler);
app.use(cors());

// Inicializar Passport
app.use(passport.initialize());

// Middlewares globales
app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: false })); // Para parsear URL-encoded

app.use("/auth", authRoutes);
app.use("/auth", rankingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/match", matchRoutes);
app.use("/api/prediction", predictionRouter);
app.use("", apiRoutes);

export default app;
