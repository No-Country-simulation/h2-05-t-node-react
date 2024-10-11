export interface predictionInterface {
    id?: string; 
    user_id?: string;
    type?: "simple" | "chained";
    bet_points?: number; 
    date?: Date; 
    status?: boolean; 
    total_points?: number;
}

export interface HistoryFilterOptions {
    status?: string; // Estado de la predicción ganado, perdido o pendiente
    startDate?: Date; // Fecha de inicio para el historial
    endDate?: Date; // Fecha de fin para el historial
    page?: number; // Número de página para paginación
  }
  