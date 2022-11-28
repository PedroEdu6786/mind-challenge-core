import { Router } from 'express'
import { makeUserLogin } from '../controller/authController'
import { methodNotAllowed } from '../middleware/errorMiddleware'

const AuthRouter = Router()

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    description: Login user
 *    tags:
 *      - Auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: heyDevelop2@gmail.com
 *              password:
 *                type: string
 *                example: qwerty
 *    responses:
 *      200:
 *        description: User has been successfully logged in
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  example: pedrcg835@gmail.com
 *                password:
 *                  type: string
 *                  example: qwerty
 *      400:
 *        description: Invalid credentials
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Invalid credentials
 */
AuthRouter.route('/login').post(makeUserLogin).all(methodNotAllowed)

export default AuthRouter
