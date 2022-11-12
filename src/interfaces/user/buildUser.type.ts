import { IUser } from './user.interface'

export type BuildUser = (userData: IUser) => Promise<IUser>
export type UpdateUser = (userData: IUser, userId: number) => Promise<IUser>
export type GetUser = (userId: number) => Promise<IUser>
export type GetUsers = () => Promise<IUser[]>
