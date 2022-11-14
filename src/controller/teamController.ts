import { Request, Response } from 'express'
import { teamService } from '../useCases/team'
import {
  createTeam,
  deleteTeamById,
  getTeamsByAccountId,
} from '../services/team/index'
import { TeamValidator } from '../utils/validators/teamValidator'

export const makeCreateTeam = async (req: Request, res: Response) => {
  const teamData = req.body

  const { error, value } = TeamValidator.validate(teamData)

  if (error) {
    return res.status(400).json({ message: 'Invalid team data', error })
  }

  const makeTeam = teamService.makeCreateTeam(createTeam)
  const data = await makeTeam(value)

  if (!data) {
    return res.status(400).json({ message: 'Team could not be created' })
  }

  return res.status(201).send(data)
}

export const makeGetAllAccountTeams = async (req: Request, res: Response) => {
  const accountId = Number(req.query.accountId)

  const getTeams = teamService.makeGetAllAccountTeams(getTeamsByAccountId)
  const data = await getTeams(accountId)

  if (!data) {
    return res.status(400).json({ message: 'Team could not be created' })
  }

  return res.status(200).send(data)
}

export const makeDeleteTeamById = async (req: Request, res: Response) => {
  const teamId = Number(req.params.teamId)

  const deleteTeam = teamService.makeDeleteTeamById(deleteTeamById)
  const data = await deleteTeam(teamId)

  if (!data) {
    return res.status(400).json({ message: 'Team not found deleted' })
  }

  return res.status(200).send(data)
}
