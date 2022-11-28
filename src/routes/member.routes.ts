import { Router } from 'express'
import {
  makeAddUserTeam,
  makeGetTeamMembers,
  makeUpdateUserTeam,
} from '../controller/memberController'
import { adminHandler, authHandler } from '../middleware/authMiddleware'
import { methodNotAllowed } from '../middleware/errorMiddleware'

const MemberRouter = Router()

/**
 * @swagger
 * /api/members:
 *  get:
 *    description: Get all members
 *    tags:
 *      - Members
 *    parameters:
 *      - in: query
 *        name: teamId
 *        required: true
 *        description: Team id
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: All members found
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 *                  name:
 *                    type: string
 *                  email:
 *                    type: string
 *                  englishLevel:
 *                    type: string
 *                  skills:
 *                    type: string
 *                  cvLink:
 *                    type: string
 *                  isAdmin:
 *                    type: boolean
 *                  isSuperadmin:
 *                    type: boolean
 *                  teamId:
 *                    type: number
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
 *  post:
 *    description: Add users to team
 *    tags:
 *      - Members
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              idUser:
 *                type: number
 *              idTeam:
 *                type: number
 *    responses:
 *      200:
 *        description: User added successfully
 *        content:
 *          application/json:
 *          schema:
 *            type: object
 *            properties:
 *                id:
 *                  type: number
 *                name:
 *                  type: string
 *                password:
 *                  type: string
 *                email:
 *                  type: string
 *                englishLevel:
 *                  type: string
 *                skills:
 *                  type: string
 *                cvLink:
 *                  type: string
 *                isAdmin:
 *                  type: boolean
 *                isSuperadmin:
 *                  type: boolean
 *                teamId:
 *                  type: number
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
 * 
 *  put:
 *    description: Update member route
 *    tags:
 *      - Members
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              idUser:
 *                type: number
 *              idTeam:
 *                type: number
 *    responses:
 *      200:
 *        description: User updated team successfully
 *        content:
 *          application/json:
 *          schema:
 *            type: object
 *            properties:
 *                id:
 *                  type: number
 *                name:
 *                  type: string
 *                password:
 *                  type: string
 *                email:
 *                  type: string
 *                englishLevel:
 *                  type: string
 *                skills:
 *                  type: string
 *                cvLink:
 *                  type: string
 *                isAdmin:
 *                  type: boolean
 *                isSuperadmin:
 *                  type: boolean
 *                teamId:
 *                  type: number
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
MemberRouter.route('/')
  .get(authHandler, adminHandler, makeGetTeamMembers)
  .put(authHandler, adminHandler, makeUpdateUserTeam)
  .post(authHandler, adminHandler, makeAddUserTeam)
  .all(methodNotAllowed)

export default MemberRouter
