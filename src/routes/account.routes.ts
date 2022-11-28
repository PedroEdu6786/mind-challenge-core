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
 * /api/accounts/{id}:
 *  put:
 *    description: Update account
 *    tags:
 *      - Accounts
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Account id
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                accountName:
 *                  type: string
 *                clientName:
 *                  type: string
 *                headOfOperation:
 *                  type: string
 *    responses:
 *      200:
 *        description: Account created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                accountName:
 *                  type: string
 *                clientName:
 *                  type: string
 *                headOfOperation:
 *                  type: string
 *      404:
 *        description: Account not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Account no
 *      400:
 *        description: Failed to update account
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Failed to update account
 *  delete:
 *    description: Delete account by id
 *    tags:
 *      - Accounts
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Account id
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Account deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                accountName:
 *                  type: string
 *                clientName:
 *                  type: string
 *                headOfOperation:
 *                  type: string
 *      404:
 *        description: Account not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Account not found
 */
AccountRouter.route('/:id')
  .put(authHandler, adminHandler, makeUpdateAccountById)
  .delete(authHandler, adminHandler, makeDeleteAccountById)
  .all(methodNotAllowed)

/**
 * @swagger
 * /api/accounts:
 *  get:
 *    description: Get all accounts
 *    tags:
 *      - Accounts
 *    responses:
 *      200:
 *        description: All accounts found
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 *                  accountName:
 *                    type: string
 *                  clientName:
 *                    type: string
 *                  headOfOperation:
 *                    type: string
 *      404:
 *        description: accounts not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: accounts not found
 *  post:
 *    description: Create account
 *    tags:
 *      - Accounts
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                accountName:
 *                  type: string
 *                clientName:
 *                  type: string
 *                headOfOperation:
 *                  type: string
 *    responses:
 *      200:
 *        description: Account created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                accountName:
 *                  type: string
 *                clientName:
 *                  type: string
 *                headOfOperation:
 *                  type: string
 *      401:
 *        description: Invalid account data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid account data
 *      400:
 *        description: Failed to create account
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Failed to create account
 */
AccountRouter.route('/')
  .get(authHandler, adminHandler, makeGetAllAccounts)
  .post(authHandler, adminHandler, makeCreateAccount)
  .all(methodNotAllowed)

export default AccountRouter
