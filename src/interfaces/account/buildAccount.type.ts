import { IAccount } from './account.type'

export type BuildAccount = (accountData: IAccount) => Promise<IAccount>
export type GetAccounts = () => Promise<IAccount[]>
