import { Request, Response } from 'express'
import { IMember } from '../interfaces/member/member.type'
import { memberService } from '../useCases/member'
import { addUserTeam } from '../services/member/index'
import { MemberValidator } from '../utils/validators/memberValidator'

export const makeAddUserTeam = async (req: Request, res: Response) => {
  const memberData: IMember = req.body

  const { error, value } = await MemberValidator.validate(memberData)

  if (error) {
    return res.status(400).json({ message: 'Invalid member data', error })
  }

  const addUser = memberService.makeCreateTeam(addUserTeam)
  const data = await addUser(value.idUser, value.idTeam)

  if (!data) {
    return res.status(400).json({ message: 'User could not be added to team' })
  }

  return res.status(200).send(data)
}
