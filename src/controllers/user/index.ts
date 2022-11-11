import { BuildUser } from '../../interfaces/user/BuildUser'
import { User } from '../../interfaces/user/User'

export const createUser: BuildUser = async (userData: User) => {
  return Promise.resolve(userData)
}
