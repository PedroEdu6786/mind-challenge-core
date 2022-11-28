import { getMockReq, getMockRes } from '@jest-mock/express'
import {
  makeAddUserTeam,
  makeUpdateUserTeam,
} from '../../../controller/memberController'
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
        if (data.id === 2) return { ...payload, teamId: 1 }
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

  it('Should fail if missing attributes', async () => {
    mockReq.body = {}

    await makeAddUserTeam(mockReq, mockRes)
    expect(mockRes.status).toBeCalledWith(400)
    expect(mockRes.json).toBeCalled()
  })

  it('Should fail if user not found', async () => {
    mockReq.body = { ...payload, userId: 2 }

    await makeAddUserTeam(mockReq, mockRes)
    expect(mockRes.status).toBeCalledWith(400)
    expect(mockRes.json).toBeCalled()
  })

  it('Should fail if team not found', async () => {
    mockReq.body = { ...payload, idTeam: 2 }

    await makeAddUserTeam(mockReq, mockRes)
    expect(mockRes.status).toBeCalledWith(400)
    expect(mockRes.json).toBeCalled()
  })

  // it('Should update member team', async () => {
  //   mockReq.body = { ...payload, idTeam: 2 }

  //   await makeUpdateUserTeam(mockReq, mockRes)
  //   expect(mockRes.status).toBeCalledWith(200)
  //   expect(mockRes.send).toBeCalled()
  // })

  // it('Should update member team to null', async () => {
  //   mockReq.body = { idUser: 1 }

  //   await makeUpdateUserTeam(mockReq, mockRes)
  //   expect(mockRes.status).toBeCalledWith(200)
  //   expect(mockRes.send).toBeCalledWith({
  //     idUser: 1,
  //     idTeam: 1,
  //     team: undefined,
  //   })
  // })

  it('Should fail if missing idUser', async () => {
    mockReq.body = {}

    await makeUpdateUserTeam(mockReq, mockRes)
    expect(mockRes.status).toBeCalledWith(400)
    expect(mockRes.json).toBeCalled()
  })
})
