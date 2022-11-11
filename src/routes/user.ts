import { Request, Response, Router } from 'express'
import { createUser } from '../controllers/user'
import { User } from '../interfaces/user/User'
import { makeCreateUser } from '../services/user'
import { UserValidator } from '../utils/validators/userValidator'

const UserRouter = Router()

UserRouter.post('/', async (req: Request, res: Response) => {
  const userData: User = req.body

  const { error, value } = UserValidator.validate(userData)

  if (error) {
    return res.status(400).json({ message: 'Invalid user data', error })
  }

  const makeUser = makeCreateUser(createUser)
  const data = await makeUser(value)

  res.status(201).send(data)
})

export default UserRouter
