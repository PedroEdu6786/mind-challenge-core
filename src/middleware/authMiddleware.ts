import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { IUser } from '../interfaces/user/user.interface'
import { getUserById } from '../useCases/user'

interface RequestUser extends Request {
  userData: IUser
}

export const authHandler = async (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  let token: string

  const { authorization } = req.headers

  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1]
      const decodedJwt = jwt.verify(token, process.env.TOKEN_KEY) as {
        id: number
        email: string
      }
      const user = await getUserById(decodedJwt.id)

      req.userData = user

      next()
    } catch (err) {
      console.error(err)
      return res.status(401).json({ message: 'Not authorized, token failed' })
    }
  }

  if (!token) {
    res.status(404).json({ message: 'Not authorized, missing token' })
  }
}
