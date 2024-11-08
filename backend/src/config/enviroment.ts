import dotenv from 'dotenv'
dotenv.config()


export const PORT = process.env.PORT || 1000
export const DB_URL = process.env.DB_URL ? process.env.DB_URL : ''
export const API_URL = process.env.API_URL ? process.env.API_URL : ''
export const API_KEY_APIFOOTBALL = process.env.API_KEY_APIFOOTBALL ? process.env.API_KEY_APIFOOTBALL : ''

export const JWT_KEY = process.env.JWT_KEY ? process.env.JWT_KEY : 'Waki'
//export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
