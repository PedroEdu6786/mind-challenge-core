import { Request, Response } from 'express'
import { IMember } from '../interfaces/member/member.type'
import { memberService } from '../useCases/member'
import {
  addUserTeam,
  getTeamMembers,
  updateUserTeam,
} from '../services/member/index'
import { MemberValidator } from '../utils/validators/memberValidator'
import { logsService } from '../useCases/logs'
import { createLogs } from '../services/logs'
import { ILogsStatus } from '../interfaces/logs/logs.type'

export const makeAddUserTeam = async (req: Request, res: Response) => {
  const memberData: IMember = req.body

  const { error, value } = await MemberValidator.validate(memberData)

  if (error) {
    return res.status(400).json({ message: 'Invalid member data', error })
  }

  const addUser = memberService.makeCreateTeam(addUserTeam)
  const data = await addUser(value.idUser, value.idTeam)

  if (!data) {
    return res.status(400).json({ message: 'User could not be added to team' })
  }

  const addLogs = logsService.makeCreateLogs(createLogs)
  await addLogs({
    userId: memberData.idUser,
    teamId: memberData.idTeam,
    status: ILogsStatus.added,
  })

  return res.status(200).send(data)
}

export const makeGetTeamMembers = async (req: Request, res: Response) => {
  const teamId = Number(req.query.teamId)

  const addUser = memberService.makeGetMembers(getTeamMembers)
  const data = await addUser(teamId)

  if (!data) {
    return res.status(404).json({ message: 'Team not found' })
  }

  return res.status(200).send(data)
}

export const makeUpdateUserTeam = async (req: Request, res: Response) => {
  const memberData: IMember = req.body
  
  if (!memberData.idUser) {
    return res.status(400).json({ message: 'Missing idUser' })
  }
  
  const updateUser = memberService.makeUpdateTeam(updateUserTeam)
  const data = await updateUser(memberData.idUser, memberData.idTeam)
  
  if (!data) {
    return res
      .status(400)
      .json({ message: 'User could not be updated in team' })
  }

  const addLogs = logsService.makeCreateLogs(createLogs)
  await addLogs({
    userId: memberData.idUser,
    teamId: data.teamId,
    status: memberData.idTeam ? ILogsStatus.added : ILogsStatus.deleted,
  })

  return res.status(200).send(data)
}
