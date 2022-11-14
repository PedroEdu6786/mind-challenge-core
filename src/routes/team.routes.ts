import { Router } from 'express'
import { makeCreateTeam, makeDeleteTeamById, makeGetAllAccountTeams } from '../controller/teamController'
import { adminHandler, authHandler } from '../middleware/authMiddleware'
import { methodNotAllowed } from '../middleware/errorMiddleware'

const TeamRouter = Router()

TeamRouter.route('/:teamId')
  .delete(authHandler, adminHandler, makeDeleteTeamById)
  .all(methodNotAllowed)

TeamRouter.route('/')
  .get(authHandler, adminHandler, makeGetAllAccountTeams)
  .post(authHandler, adminHandler, makeCreateTeam)
  .all(methodNotAllowed)

export default TeamRouter
