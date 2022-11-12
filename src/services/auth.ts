import { IAuthData } from '../interfaces/auth/auth.interface'
import { LoginUser } from '../interfaces/auth/buildAuth.type'

export const authService = Object.freeze({
  makeLoginUser: (buildUser: LoginUser) => makeLoginUser(buildUser),
})

const makeLoginUser =
  (authUser: LoginUser) =>
  async (authData: IAuthData): Promise<IAuthData> => {
    const auth = await authUser(authData)
    return auth
  }
