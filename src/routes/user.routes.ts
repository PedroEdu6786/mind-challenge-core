import { Router } from 'express'
import { makeCreateUser, makeGetUserById, makeUpdateUserById } from '../controller/userController'

const UserRouter = Router()

UserRouter.route('/:id').get(makeGetUserById).put(makeUpdateUserById)
UserRouter.route('/').post(makeCreateUser)

export default UserRouter
