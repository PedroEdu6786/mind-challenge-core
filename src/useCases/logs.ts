import { BuildLogs, GetLogs } from '../interfaces/logs/buildLogs.type'
import { ILogs } from '../interfaces/logs/logs.type'

export const logsService = Object.freeze({
  makeCreateLogs: (buildLogs: BuildLogs) => makeCreateLogs(buildLogs),
  makeGetLogs: (getLogs: GetLogs) => makeGetLogs(getLogs),
})

const makeGetLogs =
  (getLogs: GetLogs) =>
  async (accountId: number): Promise<ILogs[]> => {
    const logs = await getLogs(accountId)
    return logs
  }

const makeCreateLogs =
  (buildLogs: BuildLogs) =>
  async (logsData: ILogs): Promise<ILogs> => {
    const logs = await buildLogs(logsData)

    return logs
  }
