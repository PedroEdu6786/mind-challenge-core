import { Router } from 'express'
import {
  makeCreateUser,
  makeDeleteUserById,
  makeGetUserById,
  makeUpdateUserById,
} from '../controller/userController'
import { authHandler } from '../middleware/authMiddleware'
import { methodNotAllowed } from '../middleware/errorMiddleware'

const UserRouter = Router()

UserRouter.route('/:id')
  .get(authHandler, makeGetUserById)
  .put(authHandler, makeUpdateUserById)
  .delete(authHandler, makeDeleteUserById)
  .all(methodNotAllowed)
UserRouter.route('/').post(authHandler, makeCreateUser).all(methodNotAllowed)

export default UserRouter
