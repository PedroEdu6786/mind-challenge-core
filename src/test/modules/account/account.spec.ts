import { getMockReq, getMockRes } from '@jest-mock/express'
import { makeCreateAccount } from '../../../controller/accountController'
import { IAccount } from '../../../interfaces/account/account.type'

let mockReq: any
let mockRes: any

jest.mock('../../../infra/repositories/account.repository', () => {
  return {
    accountRepository: {
      save: (data: any) => data,
    },
  }
})

const payload: IAccount = {
  accountName: 'Pedro',
  clientName: 'UnHolyPipe',
  headOfOperation: 'Pedro Cruz',
}

describe('Account module behaviour', () => {
  beforeAll(() => {
    mockReq = getMockReq()
    ;({ res: mockRes } = getMockRes())

    jest.mock('../../../infra/repositories/account.repository', () => {
      return {
        accountRepository: {
          save: (data: any) => data,
        },
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should create a new account', async () => {
    mockReq.body = payload

    await makeCreateAccount(mockReq, mockRes)
    expect(mockRes.status).toBeCalledWith(201)
    expect(mockRes.send).toBeCalled()
  })

  it('Should fail if missing required attribures', async () => {
    mockReq.body = {}

    await makeCreateAccount(mockReq, mockRes)
    expect(mockRes.status).toBeCalledWith(400)
    expect(mockRes.json).toBeCalled()
  })
})
