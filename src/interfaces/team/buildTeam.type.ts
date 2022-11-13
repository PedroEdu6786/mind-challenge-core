import { ITeam } from './team.type'

export type BuildTeam = (teamData: ITeam) => Promise<ITeam>
export type BaseIdTeam = (teamId: number) => Promise<ITeam>
export type GetAccountTeams = (accountId: number) => Promise<ITeam[]>
