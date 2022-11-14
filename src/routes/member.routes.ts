import { Router } from 'express'
import { makeAddUserTeam, makeUpdateUserTeam } from '../controller/memberController'
import { adminHandler, authHandler } from '../middleware/authMiddleware'
import { methodNotAllowed } from '../middleware/errorMiddleware'

const MemberRouter = Router()

MemberRouter.route('/')
  .put(authHandler, adminHandler, makeUpdateUserTeam)
  .post(authHandler, adminHandler, makeAddUserTeam)
  .all(methodNotAllowed)

export default MemberRouter
