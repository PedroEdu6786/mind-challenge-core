import { BuildUser } from '../interfaces/user/BuildUser'
import { User } from '../interfaces/user/User'

export const makeCreateUser =
  (buildUser: BuildUser) =>
  async (userData: User): Promise<User> => {
    const user = await buildUser(userData)

    return user
  }
