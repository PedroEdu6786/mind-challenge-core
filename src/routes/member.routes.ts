import { Router } from 'express'
import {
  makeAddUserTeam,
  makeGetTeamMembers,
  makeUpdateUserTeam,
} from '../controller/memberController'
import { adminHandler, authHandler } from '../middleware/authMiddleware'
import { methodNotAllowed } from '../middleware/errorMiddleware'

const MemberRouter = Router()

MemberRouter.route('/')
  .get(authHandler, adminHandler, makeGetTeamMembers)
  .put(authHandler, adminHandler, makeUpdateUserTeam)
  .post(authHandler, adminHandler, makeAddUserTeam)
  .all(methodNotAllowed)

export default MemberRouter
