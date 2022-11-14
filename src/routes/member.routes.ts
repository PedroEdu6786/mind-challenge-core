import { Router } from 'express'
import { makeAddUserTeam } from '../controller/memberController'
import { adminHandler, authHandler } from '../middleware/authMiddleware'
import { methodNotAllowed } from '../middleware/errorMiddleware'

const MemberRouter = Router()

MemberRouter.route('/')
  .post(authHandler, adminHandler, makeAddUserTeam)
  .all(methodNotAllowed)

export default MemberRouter
