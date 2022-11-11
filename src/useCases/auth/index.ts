import { userRepository } from '../../infra/repositories/user.repository'
import { IAuthData } from '../../interfaces/auth/auth.interface'
import { LoginUser } from '../../interfaces/auth/buildAuth.type'
import { IUser } from '../../interfaces/user/user.interface'
import { generateToken } from '../../utils/generateToken'
import { compareHashString } from '../../utils/hashString'

export const loginUser: LoginUser = async (authData: IAuthData) => {
  const validUser = await searchUserByEmail(authData.email)
  if (!validUser) {
    return null
  }

  const validPassword = await compareHashString(
    authData.password,
    validUser.password
  )

  if (validPassword) {
    return {
      email: validUser.email,
      token: await generateToken(validUser),
    }
  }

  return null
}

export const searchUserByEmail = async (email: string) => {
  const user = await userRepository
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where(`user.email = :email`, { email })
    .getOne()
  return user as IUser
}
