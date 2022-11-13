import { IAccount } from '../interfaces/account/account.type'
import { BuildAccount } from '../interfaces/account/buildAccount.type'

export const accountService = Object.freeze({
  makeCreateAccount: (buildAccount: BuildAccount) =>
    makeCreateAccount(buildAccount),
})

const makeCreateAccount =
  (buildAccount: BuildAccount) => async (accountData: IAccount) => {
    const account = await buildAccount(accountData)

    return account
  }
