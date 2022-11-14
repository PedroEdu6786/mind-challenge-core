import {
  BaseIdTeam,
  BuildTeam,
  GetAccountTeams,
} from '../interfaces/team/buildTeam.type'
import { ITeam } from '../interfaces/team/team.type'

export const teamService = Object.freeze({
  makeCreateTeam: (buildTeam: BuildTeam) => makeCreateTeam(buildTeam),
  makeGetAllAccountTeams: (getTeams: GetAccountTeams) =>
    makeGetAllAccountTeams(getTeams),
  makeDeleteTeamById: (deleteTeam: BaseIdTeam) =>
    makeDeleteTeamById(deleteTeam),
})

const makeCreateTeam =
  (buildTeam: BuildTeam) =>
  async (teamData: ITeam): Promise<ITeam> => {
    const team = await buildTeam(teamData)

    return team
  }

const makeGetAllAccountTeams =
  (getTeams: GetAccountTeams) =>
  async (accountId: number): Promise<ITeam[]> => {
    const team = await getTeams(accountId)

    return team
  }

const makeDeleteTeamById =
  (getTeams: BaseIdTeam) =>
  async (teamId: number): Promise<ITeam> => {
    const team = await getTeams(teamId)

    return team
  }
