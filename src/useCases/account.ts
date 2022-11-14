import { IAccount } from '../interfaces/account/account.type'
import {
  BaseIdAccount,
  BuildAccount,
  GetAccounts,
  UpdateAccount,
} from '../interfaces/account/buildAccount.type'

export const accountService = Object.freeze({
  makeCreateAccount: (buildAccount: BuildAccount) =>
    makeCreateAccount(buildAccount),
  makeGetAllAccounts: (getAccounts: GetAccounts) =>
    makeGetAllAccounts(getAccounts),
  makeUpdateAccountById: (updateAccount: UpdateAccount) =>
    makeUpdateAccountById(updateAccount),
  makeDeleteAccountById: (deleteAccount: BaseIdAccount) =>
    makeDeleteAccountById(deleteAccount),
})

const makeCreateAccount =
  (buildAccount: BuildAccount) => async (accountData: IAccount) => {
    const account = await buildAccount(accountData)

    return account
  }

const makeGetAllAccounts = (getAccounts: GetAccounts) => async () => {
  const account = await getAccounts()

  return account
}

const makeUpdateAccountById =
  (updateAccount: UpdateAccount) =>
  async (accountData: IAccount, accountId: number) => {
    const account = await updateAccount(accountData, accountId)

    return account
  }

const makeDeleteAccountById =
  (deleteAccount: BaseIdAccount) =>
  async (accountId: number) => {
    const account = await deleteAccount(accountId)

    return account
  }
