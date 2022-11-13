import { Router } from 'express'
import {
  makeCreateAccount,
  makeGetAllAccounts,
  makeUpdateAccountById,
} from '../controller/accountController'
import { adminHandler, authHandler } from '../middleware/authMiddleware'
import { methodNotAllowed } from '../middleware/errorMiddleware'

const AccountRouter = Router()

AccountRouter.route('/:id')
  .put(authHandler, adminHandler, makeUpdateAccountById)
  .all(methodNotAllowed)
AccountRouter.route('/')
  .get(authHandler, adminHandler, makeGetAllAccounts)
  .post(authHandler, adminHandler, makeCreateAccount)
  .all(methodNotAllowed)

export default AccountRouter
