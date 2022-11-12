import { getMockReq, getMockRes } from '@jest-mock/express'
import { mock, MockProxy, mockReset } from 'jest-mock-extended'
import { IUser } from '../../../interfaces/user/user.interface'
import {
  makeCreateUser,
  makeDeleteUserById,
  makeGetAllUsers,
  makeGetUserById,
  makeUpdateUserById,
} from '../../../controller/userController'
import { userActions } from '../../../useCases/user'

const userIds = [1]

jest.mock('../../../infra/repositories/user.repository', () => {
  return {
    userRepository: {
      save: (data: any) => data,
      findOneBy: (data: any) => {
        if (userIds.includes(data.id)) return payload
        return null
      },
      findBy: (data: any) => [payload],
    },
  }
})

const payload: IUser = {
  name: 'Pedro',
  email: 'pedro@gmail.com',
  password: 'password',
}

let mockUserActions: MockProxy<typeof userActions>
let mockReq: any
let mockRes: any

describe('User module behaviour', () => {
  beforeAll(() => {
    mockUserActions = mock<typeof userActions>()

    mockReq = getMockReq()
    ;({ res: mockRes } = getMockRes())

    jest.mock('../../../infra/repositories/user.repository', () => {
      return {
        userRepository: {
          save: (data: any) => data,
          findOneBy: (data: any) => {
            if (userIds.includes(data.id)) return payload
            return null
          },
          findBy: (data: any) => [payload],
        },
      }
    })
  })

  afterEach(() => {
    mockReset(mockUserActions)
    mockReset(mockUserActions)
    jest.clearAllMocks()
  })

  it('Should return a new user', async () => {
    mockReq.body = payload

    await makeCreateUser(mockReq, mockRes)
    expect(mockRes.status).toBeCalledWith(201)
  })

  it('Should fail if missing attributes email, name or password', async () => {
    const failPayload = {}
    mockReq.body = failPayload

    await makeCreateUser(mockReq, mockRes)

    expect(mockRes.json).toHaveBeenCalled()
    expect(mockRes.status).toBeCalledWith(400)
  })

  it('Should return a user by id', async () => {
    const userId = 1
    mockReq.params.id = userId
    await makeGetUserById(mockReq, mockRes)

    expect(mockRes.status).toBeCalledWith(200)
    expect(mockRes.send).toBeCalledWith(payload)
  })

  it('Should not find a user with a non existing id', async () => {
    const userId = 234234
    mockReq.params.id = userId
    await makeGetUserById(mockReq, mockRes)

    expect(mockRes.status).toBeCalledWith(404)
  })

  it('Should update a user given an existing id', async () => {
    const userId = 1
    const updatePayload = {
      name: 'test',
    }
    mockReq.params.id = userId
    mockReq.body = updatePayload
    await makeUpdateUserById(mockReq, mockRes)

    expect(mockRes.status).toBeCalledWith(200)
    expect(mockRes.send).toBeCalledWith({ id: 1, ...updatePayload })
  })

  it('Should not update a user given an non existing id', async () => {
    const userId = 12342
    mockReq.params.id = userId
    mockReq.body = {}

    await makeUpdateUserById(mockReq, mockRes)

    expect(mockRes.status).toBeCalledWith(404)
  })

  it('Should not update a user given an non existing id', async () => {
    const userId = 12342
    mockReq.params.id = userId
    mockReq.body = {}

    await makeUpdateUserById(mockReq, mockRes)

    expect(mockRes.status).toBeCalledWith(404)
  })

  it('Should delete a user given an id', async () => {
    const userId = 1
    mockReq.params.id = userId

    await makeDeleteUserById(mockReq, mockRes)

    expect(mockRes.status).toBeCalledWith(200)
  })

  it('Should not delete a user if id doesnt exist', async () => {
    const userId = 1242
    mockReq.params.id = userId

    await makeDeleteUserById(mockReq, mockRes)

    expect(mockRes.status).toBeCalledWith(404)
  })

  it('Should return all users', async () => {
    await makeGetAllUsers(mockReq, mockRes)

    expect(mockRes.status).toBeCalledWith(200)
    expect(mockRes.send).toHaveBeenCalled()
  })
})
