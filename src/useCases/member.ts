import { BuildMember } from '../interfaces/member/buildMember.type'

export const memberService = Object.freeze({
  makeCreateTeam: (addUserTeam: BuildMember) => makeCreateTeam(addUserTeam),
})

const makeCreateTeam =
  (addUserTeam: BuildMember) => async (idUser: number, idTeam: number) => {
    const data = await addUserTeam(idUser, idTeam)

    return data
  }
