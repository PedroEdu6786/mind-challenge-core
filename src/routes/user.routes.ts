import { Router } from 'express'
import {
  makeCreateUser,
  makeDeleteUserById,
  makeGetAllUsers,
  makeGetUserById,
  makeUpdateUserById,
} from '../controller/userController'
import { adminHandler, authHandler } from '../middleware/authMiddleware'
import { methodNotAllowed } from '../middleware/errorMiddleware'

const UserRouter = Router()

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    description: Get user by id
 *    tags:
 *      - Users
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: User id
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: User found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                name:
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
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: User not found
 *  put:
 *    description: Update user by id
 *    tags:
 *      - Users
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: User id
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
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
 *    responses:
 *      200:
 *        description: User updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                name:
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
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: User not found
 *  delete:
 *    description: Delete user by id
*    tags:
 *      - Users
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: User id
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: User deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                name:
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
 *        description: User not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: User not found
 * 
 */
UserRouter.route('/:id')
  .get(authHandler, makeGetUserById)
  .put(authHandler, makeUpdateUserById)
  .delete(authHandler, adminHandler, makeDeleteUserById)
  .all(methodNotAllowed)

/**
 * @swagger
 * /api/users:
 *  get:
 *    description: Get all users
 *    tags:
 *      - Users
 *    responses:
 *      200:
 *        description: All users found
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
 *        description: Users not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Users not found
 *  post:
 *    description: Create user
 *    tags:
 *      - Users
 *    requestBody:
 *      required: false
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
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
 *    responses:
 *      200:
 *        description: User updated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: number
 *                name:
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
 *      401:
 *        description: Invalid user data
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid user data
 *      400:
 *        description: Email not valid
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Email has already been created
 */
UserRouter.route('/')
  .get(authHandler, adminHandler, makeGetAllUsers)
  .post(authHandler, adminHandler, makeCreateUser)
  .all(methodNotAllowed)

export default UserRouter
