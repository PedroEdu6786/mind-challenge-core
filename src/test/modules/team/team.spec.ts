import { getMockReq, getMockRes } from '@jest-mock/express'
import { makeCreateTeam } from '../../../controller/teamController'
import { ITeam } from '../../../interfaces/team/team.type'

let mockReq: any
let mockRes: any

const payload: ITeam = {
  idAccount: 2
}

const accountIds = [1]

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

describe('Team module behaviour', () => {
  beforeAll(() => {
    mockReq = getMockReq()
    ;({ res: mockRes } = getMockRes())

    jest.mock('../../../infra/repositories/team.repository', () => {
      return {
        teamRepository: {
          save: (data: any) => data,
          findBy: (data: any) => [payload],
        },
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Should create a new team", async () => {
    mockReq.body = payload

    await makeCreateTeam(mockReq, mockRes)
    expect(mockRes.status).toBeCalledWith(201)
    expect(mockRes.send).toBeCalled()
  })

  it("Should fail create if missing accountId in payload", async () => {
    mockReq.body = {}

    await makeCreateTeam(mockReq, mockRes)
    expect(mockRes.status).toBeCalledWith(400)
    expect(mockRes.json).toBeCalled()
  })
})
