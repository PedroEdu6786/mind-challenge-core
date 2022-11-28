import { Router } from 'express'
import { makeCreateTeam, makeDeleteTeamById, makeGetAllAccountTeams } from '../controller/teamController'
import { adminHandler, authHandler } from '../middleware/authMiddleware'
import { methodNotAllowed } from '../middleware/errorMiddleware'

const TeamRouter = Router()

/**
 * @swagger
 * /api/teams/{id}:
 *  delete:
 *    description: Delete Team by id
 *    tags:
 *      - Teams
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Team id
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Team deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                accountId:
 *                  type: number
 *                teamName:
 *                  type: string
 *      404:
 *        description: Team not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Team not found
 */
TeamRouter.route('/:teamId')
  .delete(authHandler, adminHandler, makeDeleteTeamById)
  .all(methodNotAllowed)


/**
 * @swagger
 * /api/teams:
 *  get:
 *    description: Get all teams from account
 *    tags:
 *      - Teams
 *    parameters:
 *      - in: query
 *        name: accountId
 *        required: true
 *        description: Account id
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: All Teams found
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                 id:
 *                   type: number
 *                 accountId:
 *                   type: number
 *                 teamName:
 *                   type: string
 *      404:
 *        description: Teams not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Teams not found
 *  post:
 *    description: Create team
 *    tags:
 *      - Teams
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              accountId:
 *                type: number
 *    responses:
 *      200:
 *        description: Team created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               id:
 *                 type: number
 *               accountId:
 *                 type: number
 *               teamName:
 *                 type: string
 *      401:
 *        description: Invalid team data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid team data
 *      400:
 *        description: Failed to create team
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Failed to create team
 */
TeamRouter.route('/')
  .get(authHandler, adminHandler, makeGetAllAccountTeams)
  .post(authHandler, adminHandler, makeCreateTeam)
  .all(methodNotAllowed)

export default TeamRouter
