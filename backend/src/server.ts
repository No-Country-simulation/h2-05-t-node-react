// src/server.ts
import app from './app';
import dotenv from 'dotenv';
import sequelize from './config/database';
import { createDatabaseStructures } from './utils/createDatabaseStructures';

dotenv.config();

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: false }) // false para no sobrescribir tablas
  .then(async () => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
    await createDatabaseStructures(sequelize);
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
