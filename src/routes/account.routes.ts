import { Router } from 'express'
import { makeCreateAccount } from '../controller/accountController'
import { adminHandler, authHandler } from '../middleware/authMiddleware'
import { methodNotAllowed } from '../middleware/errorMiddleware'

const AccountRouter = Router()

AccountRouter.route('/')
  .post(adminHandler, authHandler, makeCreateAccount)
  .all(methodNotAllowed)

export default AccountRouter
