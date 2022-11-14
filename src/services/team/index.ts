import { QueryFailedError } from 'typeorm'
import { Team } from '../../dtos/team.dto'
import { teamRepository } from '../../infra/repositories/team.repository'
import {
  BaseIdTeam,
  BuildTeam,
  GetAccountTeams,
} from '../../interfaces/team/buildTeam.type'
import { ITeam } from '../../interfaces/team/team.type'

export const createTeam: BuildTeam = async (teamData: ITeam) => {
  const newTeam = new Team(teamData)

  try {
    const data = await teamRepository.save(newTeam)
    return data
  } catch (err) {
    if (err instanceof QueryFailedError) {
      console.log(err.message)
    }
  }

  return null
}

export const getTeamsByAccountId: GetAccountTeams = async (
  idAccount: number
) => {
  const teams = await teamRepository.findBy({ idAccount })

  return teams
}

export const getTeamById = async (teamId: number) => {
  const team = await teamRepository.findOneBy({ id: teamId })

  return team
}

export const deleteTeamById: BaseIdTeam = async (teamId: number) => {
  const validTeam: ITeam = await getTeamById(teamId)

  if (!validTeam) {
    return null
  }

  try {
    await teamRepository.delete(teamId)
    return validTeam
  } catch (err) {
    if (err instanceof QueryFailedError) {
      console.log(err.message)
    }
  }

  return validTeam
}
