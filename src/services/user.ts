import {
  BuildUser,
  GetUser,
  UpdateUser,
} from '../interfaces/user/buildUser.type'
import { IUser } from '../interfaces/user/user.interface'

export const userService = Object.freeze({
  makeCreateUser: (buildUser: BuildUser) => makeCreateUser(buildUser),
  makeGetUser: (getUser: GetUser) => makeGetUser(getUser),
  makeUpdateUser: (updateUser: UpdateUser) => makeUpdateUser(updateUser),
})

const makeCreateUser =
  (buildUser: BuildUser) =>
  async (userData: IUser): Promise<IUser> => {
    const user = await buildUser(userData)

    return user
  }

const makeGetUser =
  (getUser: GetUser) =>
  async (userId: number): Promise<IUser> => {
    const user = await getUser(userId)

    return user
  }

const makeUpdateUser =
  (updateUser: UpdateUser) =>
  async (userData: IUser, userId: number): Promise<IUser> => {
    const user = await updateUser(userData, userId)

    return user
  }
