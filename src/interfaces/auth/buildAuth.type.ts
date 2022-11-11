import { IAuthData } from './auth.interface'

export type LoginUser = (userData: IAuthData) => Promise<IAuthData>
