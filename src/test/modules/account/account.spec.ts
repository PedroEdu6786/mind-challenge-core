import { getMockReq, getMockRes } from '@jest-mock/express'
import {
  makeCreateAccount,
  makeGetAllAccounts,
} from '../../../controller/accountController'
import { IAccount } from '../../../interfaces/account/account.type'

let mockReq: any
let mockRes: any

const payload: IAccount = {
  accountName: 'Pedro',
  clientName: 'UnHolyPipe',
  headOfOperation: 'Pedro Cruz',
}

jest.mock('../../../infra/repositories/account.repository', () => {
  return {
    accountRepository: {
      save: (data: any) => data,
      findBy: (data: any) => [payload],
    },
  }
})

describe('Account module behaviour', () => {
  beforeAll(() => {
    mockReq = getMockReq()
    ;({ res: mockRes } = getMockRes())

    jest.mock('../../../infra/repositories/account.repository', () => {
      return {
        accountRepository: {
          save: (data: any) => data,
          findBy: (data: any) => [payload],
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

  it('Should return all accounts', async () => {
    mockReq.body = {}

    await makeGetAllAccounts(mockReq, mockRes)
    expect(mockRes.status).toBeCalledWith(200)
    expect(mockRes.send).toBeCalled()
  })
})
