import { Router } from 'express'
import {
  makeCreateAccount,
  makeDeleteAccountById,
  makeGetAllAccounts,
  makeUpdateAccountById,
} from '../controller/accountController'
import { adminHandler, authHandler } from '../middleware/authMiddleware'
import { methodNotAllowed } from '../middleware/errorMiddleware'

const AccountRouter = Router()

AccountRouter.route('/:id')
  .put(authHandler, adminHandler, makeUpdateAccountById)
  .delete(authHandler, adminHandler, makeDeleteAccountById)
  .all(methodNotAllowed)
AccountRouter.route('/')
  .get(authHandler, adminHandler, makeGetAllAccounts)
  .post(authHandler, adminHandler, makeCreateAccount)
  .all(methodNotAllowed)

export default AccountRouter
