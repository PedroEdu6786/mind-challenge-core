import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes'
import { logRoute } from './middleware/log'

dotenv.config()

const server: Express = express()
export const PORT = process.env.PORT || 4000

server.use(cors())
server.use(express.json())
server.all('*', logRoute)

server.use('/api', router)

export default server
