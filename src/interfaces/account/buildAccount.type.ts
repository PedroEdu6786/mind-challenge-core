import { IAccount } from './account.type'

export type BuildAccount = (accountData: IAccount) => Promise<IAccount>
