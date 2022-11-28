import { Request, Response } from 'express'
import { getLogs } from '../services/logs'
import { logsService } from '../useCases/logs'

export const makeGetLogsFromAccount = async (req: Request, res: Response) => {
  const accountId = Number(req.query.accountId)
  if (!accountId) {
    return res.status(400).json({ message: 'Missing accountId' })
  }

  const makeLogs = logsService.makeGetLogs(getLogs)
  const data = await makeLogs(accountId)
  if (!data) {
    return res.status(400).json({ message: 'Logs could not be created' })
  }
  return res.status(201).send(data.reverse())
}
