import express from 'express';
import userRoutes from './routes/user.routes';

const app = express();

// Middlewares globales
app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear URL-encoded

app.use('/api/users', userRoutes);

export default app;