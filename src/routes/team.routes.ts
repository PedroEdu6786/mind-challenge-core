import { Router } from 'express'
import { makeCreateTeam, makeGetAllAccountTeams } from '../controller/teamController'
import { adminHandler, authHandler } from '../middleware/authMiddleware'
import { methodNotAllowed } from '../middleware/errorMiddleware'

const TeamRouter = Router()

TeamRouter.route('/:accountId')
  .get(authHandler, adminHandler, makeGetAllAccountTeams)
  .all(methodNotAllowed)
TeamRouter.route('/')
  .post(authHandler, adminHandler, makeCreateTeam)
  .all(methodNotAllowed)

export default TeamRouter
