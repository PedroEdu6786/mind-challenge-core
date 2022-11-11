import { User } from './User'

export type BuildUser = (userData: User) => Promise<User>
