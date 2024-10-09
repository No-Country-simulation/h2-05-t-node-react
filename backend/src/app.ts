import express from 'express';
import passport from 'passport';
import './config/passportConfig';
import  authRoutes  from './routes/auth.routes';
import apiRouter from './routes/api.routes';
import userRouter from './routes/user.routes';
import { errorHandler } from './middlewares/errorHandler';
import cors from "cors"

const app = express();

app.use(errorHandler);
app.use(cors())

// Inicializar Passport
app.use(passport.initialize());

// Middlewares globales
app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear URL-encoded

app.use('/auth', authRoutes);
app.use('/api/users', userRouter);
app.use('', apiRouter)

export default app;