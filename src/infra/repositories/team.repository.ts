import { Team } from '../../dtos/team.dto'
import { AppDataSource } from '../database/data-source'

export const teamRepository = AppDataSource.getRepository(Team)
