// src/server.ts
import app from './app';
import sequelize from './config/database';
import { PORT } from './config/enviroment';


sequelize.sync({ alter: false }) // false para no sobrescribir tablas
  .then(() => {
    console.log("Sincronización de base de datos completada.");
    app.listen(PORT, () => {
      console.log(`Servidor escuchando`);
    });
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });
