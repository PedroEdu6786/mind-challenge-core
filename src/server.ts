import express, { Express } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const server: Express = express()
export const PORT = process.env.PORT || 4000

export default server
