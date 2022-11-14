import { IUser } from '../user/user.interface'

export type BuildMember = (userId: number, teamId: number) => Promise<IUser>
