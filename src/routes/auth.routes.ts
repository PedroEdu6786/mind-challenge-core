import { Router } from 'express'
import { makeUserLogin } from '../controller/authController'

const AuthRouter = Router()

AuthRouter.route('/login').post(makeUserLogin)

export default AuthRouter
