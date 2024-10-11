import cron from "node-cron";
import { getUsers } from "../services/user.service"; // Asume que tienes una función para obtener todos los usuarios
import { adjustFuturePredictionsIfNeeded } from "../utils/futurePrediction";

// Cron job que se ejecuta diariamente a la medianoche
cron.schedule("0 0 * * *", async () => {
  console.log("Ajustando predicciones futuras para todos los usuarios...");

  try {
    // Obtener todos los usuarios
    const users = await getUsers();

    if (!users) {
      throw new Error("Usuarios no encontrados");
    }

    for (const user of users) {
      // Ajustar las predicciones futuras para cada usuario si es necesario
      await adjustFuturePredictionsIfNeeded(user.id!);
    }

    console.log("Predicciones futuras ajustadas correctamente.");
  } catch (error) {
    console.error("Error al ajustar predicciones futuras:", error);
  }
});

console.log("Cron ejecutandose");
