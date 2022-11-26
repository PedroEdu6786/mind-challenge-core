import { Router } from 'express'
import { makeGetLogsFromAccount } from '../controller/logsController'
import { adminHandler, authHandler } from '../middleware/authMiddleware'
import { methodNotAllowed } from '../middleware/errorMiddleware'

const LogsRouter = Router()

LogsRouter.route('/')
  .get(authHandler, adminHandler, makeGetLogsFromAccount)
  .all(methodNotAllowed)

export default LogsRouter
