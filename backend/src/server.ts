// src/server.ts
import app from './app';
import dotenv from 'dotenv';
import sequelize from './config/database';

dotenv.config();

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: false }) // false para no sobrescribir tablas
  .then(() => {
    console.log("Sincronización de base de datos completada.");
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
