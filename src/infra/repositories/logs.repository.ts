import { Logs } from '../../dtos/logs.dto'
import { AppDataSource } from '../database/data-source'

export const logsRepository = AppDataSource.getRepository(Logs)
