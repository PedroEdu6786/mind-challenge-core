import { Request, Response } from 'express'
import { authService } from '../services/auth'
import { loginUser } from '../useCases/auth'

export const makeUserLogin = async (req: Request, res: Response) => {
  const authData = req.body
  const login = authService.makeLoginUser(loginUser)

  const data = await login(authData)

  if (!data) {
    return res.status(400).json({ message: 'Invalid credentials' })
  }

  res.status(200).send(data)
}
