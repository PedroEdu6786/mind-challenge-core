import { Router } from 'express'
import { makeUserLogin } from '../controller/authController'
import { methodNotAllowed } from '../middleware/errorMiddleware'

const AuthRouter = Router()

AuthRouter.route('/login').post(makeUserLogin).all(methodNotAllowed)

export default AuthRouter
