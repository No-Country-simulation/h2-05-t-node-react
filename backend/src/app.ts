import express from 'express';
import './cron/adjustPredictionsCron';
import apiRouter from './routes/api.router';
import userRouter from './routes/user.router';
import { errorHandler } from './middlewares/errorHandler';
import cors from "cors"
import matchRouter from './routes/match.router';
import predictionRouter from './routes/prediction.router';
import futurePredictionRouter from './routes/futurePrediction.router';

const app = express();

app.use(errorHandler);
app.use(cors())

// Middlewares globales
app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear URL-encoded

app.use('/api/users', userRouter);
app.use('/api/match', matchRouter);
app.use('/api/prediction', predictionRouter, futurePredictionRouter);
app.use('', apiRouter)

export default app;