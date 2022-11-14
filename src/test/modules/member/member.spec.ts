import { getMockReq, getMockRes } from '@jest-mock/express'
import { makeAddUserTeam } from '../../../controller/memberController'
import { IMember } from '../../../interfaces/member/member.type'

let mockReq: any
let mockRes: any

const payload: IMember = {
  idUser: 1,
  idTeam: 1,
}

const accountIds = [1]

jest.mock('../../../infra/repositories/user.repository', () => {
  return {
    userRepository: {
      save: (data: any) => data,
      findBy: (data: any) => [payload],
      findOneBy: (data: any) => {
        if (accountIds.includes(data.id)) return payload
        return null
      },
    },
  }
})
jest.mock('../../../infra/repositories/team.repository', () => {
  return {
    teamRepository: {
      save: (data: any) => data,
      findBy: (data: any) => [payload],
      findOneBy: (data: any) => {
        if (accountIds.includes(data.id)) return payload
        return null
      },
    },
  }
})

describe('User - team operations', () => {
  beforeAll(() => {
    mockReq = getMockReq()
    ;({ res: mockRes } = getMockRes())
  })
  it('Should add a user to a team', async () => {
    mockReq.body = payload

    await makeAddUserTeam(mockReq, mockRes)
    expect(mockRes.status).toBeCalledWith(200)
    expect(mockRes.send).toBeCalled()
  })
})
