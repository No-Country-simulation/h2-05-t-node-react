export interface userInterface {
  id?: string,
  username: string,
  email: string,
  password: string,
  rol?: string,
  photo?: string,
  total_predictions?: number,
  subscription?: boolean,
  registration_date?: Date,
  ranking_id?: string
}
