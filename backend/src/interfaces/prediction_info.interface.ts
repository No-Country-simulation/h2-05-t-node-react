export interface predictionInfo {
    match_id: string,
    prediction_id: string,
    predictionType: string,
    predictionQuotaType: string,
    selectedPredictionType: string,
    fee: number,
    prediction_date: Date,
    status?: string
}