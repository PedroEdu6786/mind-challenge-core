import { User } from '../../dtos/user.dto'
import { AppDataSource } from '../database/data-source'

export const userRepository = AppDataSource.getRepository(User)
