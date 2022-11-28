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

/**
 * @swagger
 * /api/accounts/:id:
 *  put:
 *    description: test
 *    tags:
 *      - Accounts
 *    responses:
 *      '200':
 *        description: test
 *  delete:
 *    description: test
 *    tags:
 *      - Accounts
 *    responses:
 *      '200':
 *        description: test
 */
AccountRouter.route('/:id')
  .put(authHandler, adminHandler, makeUpdateAccountById)
  .delete(authHandler, adminHandler, makeDeleteAccountById)
  .all(methodNotAllowed)

/**
 * @swagger
 * /api/accounts:
 *  get:
 *    description: test
 *    tags:
 *      - Accounts
 *    responses:
 *      '200':
 *        description: test
 *  post:
 *    description: test
 *    tags:
 *      - Accounts
 *    responses:
 *      '200':
 *        description: test
 */
AccountRouter.route('/')
  .get(authHandler, adminHandler, makeGetAllAccounts)
  .post(authHandler, adminHandler, makeCreateAccount)
  .all(methodNotAllowed)

export default AccountRouter
