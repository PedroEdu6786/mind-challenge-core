import { Router } from 'express'
import {
  makeCreateUser,
  makeDeleteUserById,
  makeGetUserById,
  makeUpdateUserById,
} from '../controller/userController'

const UserRouter = Router()

UserRouter.route('/:id')
  .get(makeGetUserById)
  .put(makeUpdateUserById)
  .delete(makeDeleteUserById)
UserRouter.route('/').post(makeCreateUser)

export default UserRouter
