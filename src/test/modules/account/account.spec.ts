import { getMockReq, getMockRes } from '@jest-mock/express'
import {
  makeCreateAccount,
  makeDeleteAccountById,
  makeGetAllAccounts,
  makeUpdateAccountById,
} from '../../../controller/accountController'
import { IAccount } from '../../../interfaces/account/account.type'

let mockReq: any
let mockRes: any

const payload: IAccount = {
  accountName: 'Pedro',
  clientName: 'UnHolyPipe',
  headOfOperation: 'Pedro Cruz',
}

const accountIds = [1]

jest.mock('../../../infra/repositories/account.repository', () => {
  return {
    accountRepository: {
      save: (data: any) => data,
      findBy: (data: any) => [payload],
      findOneBy: (data: any) => {
        if (accountIds.includes(data.id)) return payload
        return null
      },
    },
  }
})

describe('Account module behaviour', () => {
  beforeAll(() => {
    mockReq = getMockReq()
    ;({ res: mockRes } = getMockRes())
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

  it('Should update a user given an existing id', async () => {
    const accountId = 1
    const updatePayload = {
      accountName: 'test',
    }
    mockReq.params.id = accountId
    mockReq.body = updatePayload
    await makeUpdateAccountById(mockReq, mockRes)

    expect(mockRes.status).toBeCalledWith(200)
    expect(mockRes.send).toBeCalledWith({ id: 1, ...updatePayload })
  })

  it('Should not update a user given an non existing id', async () => {
    const accountId = 12342
    mockReq.params.id = accountId
    mockReq.body = {}

    await makeUpdateAccountById(mockReq, mockRes)

    expect(mockRes.status).toBeCalledWith(404)
  })

  it('Should delete a user given an id', async () => {
    const accountId = 1
    mockReq.params.id = accountId

    await makeDeleteAccountById(mockReq, mockRes)

    expect(mockRes.status).toBeCalledWith(200)
  })

  it('Should not delete a user if id doesnt exist', async () => {
    const accountId = 1242
    mockReq.params.id = accountId

    await makeDeleteAccountById(mockReq, mockRes)

    expect(mockRes.status).toBeCalledWith(404)
  })
})
