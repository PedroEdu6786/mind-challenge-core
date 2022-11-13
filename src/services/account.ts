import { IAccount } from '../interfaces/account/account.type'
import {
  BuildAccount,
  GetAccounts,
} from '../interfaces/account/buildAccount.type'

export const accountService = Object.freeze({
  makeCreateAccount: (buildAccount: BuildAccount) =>
    makeCreateAccount(buildAccount),
  makeGetAllAccounts: (getAccounts: GetAccounts) =>
    makeGetAllAccounts(getAccounts),
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
