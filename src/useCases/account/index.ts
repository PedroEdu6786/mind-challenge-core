import { QueryFailedError } from 'typeorm'
import { Account } from '../../dtos/account.dto'
import { accountRepository } from '../../infra/repositories/account.repository'
import { IAccount } from '../../interfaces/account/account.type'
import {
  BuildAccount,
  GetAccounts,
} from '../../interfaces/account/buildAccount.type'

export const createAccount: BuildAccount = async (accountData: IAccount) => {
  const newAccount = new Account(accountData)

  try {
    const data = await accountRepository.save(newAccount)
    return data
  } catch (err) {
    if (err instanceof QueryFailedError) {
      console.log(err.message)
    }
  }

  return null
}

export const getAllAccounts: GetAccounts = async () => {
  const account = await accountRepository.findBy({})
  return account
}
