import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { IUser } from '../interfaces/user/user.interface'

dotenv.config()

const { TOKEN_KEY, TOKEN_EXPIRATION } = process.env

export const generateToken = (authData: IUser) => {
  return jwt.sign({ id: authData.id, email: authData.email }, TOKEN_KEY, {
    expiresIn: TOKEN_EXPIRATION,
  })
}
