import { Router } from 'express'
import { makeGetLogsFromAccount } from '../controller/logsController'
import { adminHandler, authHandler } from '../middleware/authMiddleware'
import { methodNotAllowed } from '../middleware/errorMiddleware'

const LogsRouter = Router()

/**
 * @swagger
 * /api/logs:
 *  get:
 *    description: Get all logs
 *    tags:
 *      - Logs
 *    parameters:
 *      - in: query
 *        name: accountId
 *        required: true
 *        description: Account id
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: All logs from account
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 *                  status:
 *                    type: string
 *                  userId:
 *                    type: number
 *                  teamId:
 *                    type: number
 *                  accountId:
 *                    type: number
 *                  createdAt:
 *                    type: string
 *                  updatedAt:
 *                    type: string
 *                  user:
 *                    type: object
 *      404:
 *        description: Logs not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: logs not found
 */
LogsRouter.route('/')
  .get(authHandler, adminHandler, makeGetLogsFromAccount)
  .all(methodNotAllowed)

export default LogsRouter
