import {
  BuildMember,
  UpdateMember,
} from '../interfaces/member/buildMember.type'

export const memberService = Object.freeze({
  makeCreateTeam: (addUserTeam: BuildMember) => makeCreateTeam(addUserTeam),
  makeUpdateTeam: (updateMember: UpdateMember) => makeUpdate(updateMember),
})

const makeCreateTeam =
  (addUserTeam: BuildMember) => async (idUser: number, idTeam: number) => {
    const data = await addUserTeam(idUser, idTeam)

    return data
  }

const makeUpdate =
  (addUserTeam: UpdateMember) => async (idUser: number, idTeam: number) => {
    const data = await addUserTeam(idUser, idTeam)

    return data
  }
