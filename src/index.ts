import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import server, { PORT } from './server'
import router from './routes'

dotenv.config()

server.use(cors())
server.use(express.json())
server.all('*', logRoute)

server.use(router)

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

function logRoute(req: Request, res: Response, next: NextFunction) {
  console.log(req.path)
  next()
}

export default server
