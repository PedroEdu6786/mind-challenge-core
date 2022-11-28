import { IUser } from '../user/user.interface'

export type BuildMember = (userId: number, teamId: number) => Promise<IUser>
export type UpdateMember = (userId: number, teamId: number) => Promise<IUser>
export type GetMembers = (teamId: number) => Promise<IUser[]>
