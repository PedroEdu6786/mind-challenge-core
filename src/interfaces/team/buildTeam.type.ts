import { ITeam } from "./team.type"

export type BuildTeam = (teamData: ITeam) => Promise<ITeam>