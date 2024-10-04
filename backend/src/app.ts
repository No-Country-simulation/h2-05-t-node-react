import express from 'express';
import userRoutes from './routes/user.routes';
import apiRouter from './routes/api.router';

const app = express();

// Middlewares globales
app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear URL-encoded

app.use('/api/users', userRoutes);
app.use('', apiRouter)

export default app;