import { Request, Response } from 'express'
import { teamService } from '../services/team'
import { createTeam } from '../useCases/team'
import { TeamValidator } from '../utils/validators/teamValidator'

export const makeCreateTeam = async (req: Request, res: Response) => {
  const teamData = req.body

  const { error, value } = TeamValidator.validate(teamData)

  if (error) {
    return res.status(400).json({ message: 'Invalid team data', error })
  }

  const makeUser = teamService.makeCreateTeam(createTeam)
  const data = await makeUser(value)

  if (!data) {
    return res.status(400).json({ message: 'Team could not be created' })
  }

  return res.status(201).send(data)
}
