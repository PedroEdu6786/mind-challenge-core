import { Account } from '../../dtos/account.dto'
import { AppDataSource } from '../database/data-source'

export const accountRepository = AppDataSource.getRepository(Account)
