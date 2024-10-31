import dotenv from 'dotenv'
dotenv.config()


export const PORT = process.env.PORT
export const DB_URL = process.env.DB_URL ? process.env.DB_URL : ''

export const JWT_KEY = process.env.JWT_KEY ? process.env.JWT_KEY : 'Waki'
//export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
