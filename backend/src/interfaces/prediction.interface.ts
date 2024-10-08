export interface predictionInterface {
    id?: string; 
    user_id?: string;
    type?: "simple" | "chained";
    bet_points?: number; 
    date?: Date; 
    status?: boolean; 
    total_points?: number;
}