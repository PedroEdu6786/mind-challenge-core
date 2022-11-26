import { QueryFailedError } from 'typeorm'
import { Logs } from '../../dtos/logs.dto'
import { logsRepository } from '../../infra/repositories/logs.repository'
import { teamRepository } from '../../infra/repositories/team.repository'
import { BuildLogs, GetLogs } from '../../interfaces/logs/buildLogs.type'
import { ILogs } from '../../interfaces/logs/logs.type'

export const createLogs: BuildLogs = async (logsData: ILogs) => {
  const team = await findTeamById(logsData.teamId)

  const logPayload = { ...logsData, accountId: team.idAccount }

  const newLog = new Logs(logPayload)

  try {
    const data = await logsRepository.save(newLog)
    return data as ILogs
  } catch (err) {
    if (err instanceof QueryFailedError) {
      console.log(err.message)
    }
  }

  return null
}

export const getLogs: GetLogs = async (accountId: number) => {
  const logs = await logsRepository.find({
    where: {
      accountId,
    },
  })

  return logs as ILogs[]
}

const findTeamById = async (teamId: number) => {
  return await teamRepository.findOneBy({ id: teamId })
}
