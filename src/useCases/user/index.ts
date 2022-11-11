import { valid } from 'joi'
import { QueryFailedError } from 'typeorm'
import { User } from '../../dtos/user.dto'
import { userRepository } from '../../infra/repositories/user.repository'
import {
  BuildUser,
  GetUser,
  UpdateUser,
} from '../../interfaces/user/buildUser.type'
import { IUser } from '../../interfaces/user/user.interface'

export const userActions = Object.freeze({
  createUser: (userData: IUser) => createUser(userData),
  getUserById: (userId: number) => getUserById(userId),
})

export const createUser: BuildUser = async (userData: IUser) => {
  const validEmail = await userEmailExists(userData.email)

  if (validEmail) {
    return null
  }

  const newUser = new User(userData)

  try {
    const data = await userRepository.save(newUser)
    return data
  } catch (err) {
    if (err instanceof QueryFailedError) {
      console.log(err.message)
    }
  }

  return null
}

const userEmailExists = async (email: string) => {
  const data = await searchUserByEmail(email)
  return Boolean(data)
}

const searchUserByEmail = async (email: string) => {
  const user = await userRepository.findOneBy({ email: email })
  return user
}

export const getUserById: GetUser = async (userId: number) => {
  const user = await userRepository.findOneBy({ id: userId })
  return user
}

export const updateUserById: UpdateUser = async (
  userData: IUser,
  userId: number
) => {
  const validId = await getUserById(userId)

  if (!validId) {
    return null
  }

  const newUser = new User(userData)

  try {
    const data = await userRepository.save({
      id: userId,
      ...newUser,
    })
    return data
  } catch (err) {
    if (err instanceof QueryFailedError) {
      console.log(err.message)
    }
  }

  return userData
}

export const deleteUserById: GetUser = async (userId: number) => {
  const validUser: IUser = await getUserById(userId)

  if (!validUser) {
    return null
  }

  try {
    await userRepository.delete(userId)
    return validUser
  } catch (err) {
    if (err instanceof QueryFailedError) {
      console.log(err.message)
    }
  }

  return validUser
}
