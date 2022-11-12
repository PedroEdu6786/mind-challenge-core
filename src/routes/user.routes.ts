import { Router } from 'express'
import {
  makeCreateUser,
  makeDeleteUserById,
  makeGetAllUsers,
  makeGetUserById,
  makeUpdateUserById,
} from '../controller/userController'
import { adminHandler, authHandler } from '../middleware/authMiddleware'
import { methodNotAllowed } from '../middleware/errorMiddleware'

const UserRouter = Router()

UserRouter.route('/:id')
  .get(authHandler, adminHandler, makeGetUserById)
  .put(authHandler, adminHandler, makeUpdateUserById)
  .delete(authHandler, adminHandler, makeDeleteUserById)
  .all(methodNotAllowed)
UserRouter.route('/')
  .get(authHandler, adminHandler, makeGetAllUsers)
  .post(authHandler, adminHandler, makeCreateUser)
  .all(methodNotAllowed)

export default UserRouter
