import { Request, Response } from 'express'
import { IUser } from '../interfaces/user/user.interface'
import { userService } from '../services/user'
import { createUser, deleteUserById, getUserById, updateUserById } from '../useCases/user'
import { UserValidator } from '../utils/validators/userValidator'

export const makeGetUserById = async (req: Request, res: Response) => {
  const userId = Number(req.params.id)
  const lookupUser = userService.makeGetUser(getUserById)

  const data = await lookupUser(userId)

  if (!data) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).send(data)
}

export const makeCreateUser = async (req: Request, res: Response) => {
  const userData: IUser = req.body

  const { error, value } = UserValidator.validate(userData)

  if (error) {
    return res.status(400).json({ message: 'Invalid user data', error })
  }

  const makeUser = userService.makeCreateUser(createUser)
  const data = await makeUser(value)

  if (!data) {
    return res
      .status(400)
      .json({ message: 'User with email has already been created' })
  }

  return res.status(201).send(data)
}

export const makeUpdateUserById = async (req: Request, res: Response) => {
  const userData: IUser = req.body
  const userId: number = Number(req.params.id)

  const updateUser = userService.makeUpdateUser(updateUserById)
  const data = await updateUser(userData, userId)

  if (!data) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.status(200).send(data)
}

export const makeDeleteUserById = async (req: Request, res: Response) => {
  const userId: number = Number(req.params.id)

  const deleteUser = userService.makeGetUser(deleteUserById)
  const data = await deleteUser(userId)

  if (!data) {
    return res.status(404).json({ message: 'User not found' })
  }

  return res.status(200).send(data)
}
