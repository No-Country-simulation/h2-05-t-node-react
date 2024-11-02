export interface predictionQuotaInterface {
    id?: string;
    user_id: string,
    date: Date,
    daily_predictions_left?: number,
    future_predictions_left?: number
}