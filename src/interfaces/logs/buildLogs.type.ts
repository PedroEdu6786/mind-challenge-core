import { ILogs } from './logs.type'

export type BuildLogs = (logData: ILogs) => Promise<ILogs>
export type GetLogs = (accountId: number) => Promise<ILogs[]>
