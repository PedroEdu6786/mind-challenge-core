import { BuildTeam } from '../interfaces/team/buildTeam.type'
import { ITeam } from '../interfaces/team/team.type'

export const teamService = Object.freeze({
  makeCreateTeam: (buildTeam: BuildTeam) => makeCreateTeam(buildTeam),
})

const makeCreateTeam =
  (buildTeam: BuildTeam) =>
  async (userData: ITeam): Promise<ITeam> => {
    const team = await buildTeam(userData)

    return team
  }
