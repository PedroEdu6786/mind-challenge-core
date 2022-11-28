import { QueryFailedError } from 'typeorm'
import { User } from '../../dtos/user.dto'
import { userRepository } from '../../infra/repositories/user.repository'
import {
  BuildMember,
  UpdateMember,
} from '../../interfaces/member/buildMember.type'
import { getTeamById } from '../team/index'
import { getUserById } from '../user/index'

export const addUserTeam: BuildMember = async (
  idUser: number,
  idTeam: number
) => {
  const user = (await getUserById(idUser)) as User

  if (!user || user.teamId) {
    return null
  }

  const team = await getTeamById(idTeam)

  if (!team) {
    return null
  }

  user.team = team

  try {
    const data = await userRepository.save(user)
    return data
  } catch (err) {
    if (err instanceof QueryFailedError) {
      console.log(err.message)
    }
  }

  return null
}

export const getTeamMembers = async (idTeam: number) => {
  const team = await getTeamById(idTeam)

  if (!team) {
    return null
  }

  try {
    const data = await getTeamMembersById(idTeam)
    return data
  } catch (err) {
    if (err instanceof QueryFailedError) {
      console.log(err.message)
    }
  }

  return null
}

const getTeamMembersById = async (teamId: number) => {
  const members = await userRepository.find({
    where: {
      teamId,
    },
  })

  return members
}

export const updateUserTeam: UpdateMember = async (
  idUser: number,
  idTeam: number
) => {
  const user = (await getUserById(idUser)) as User
  const pastUser = { ...user }

  if (!user) {
    return null
  }

  const team = await getTeamById(idTeam)
  user.team = idTeam && team

  try {
    await userRepository.save(user)
    return pastUser
  } catch (err) {
    if (err instanceof QueryFailedError) {
      console.log(err.message)
    }
  }

  return null
}
