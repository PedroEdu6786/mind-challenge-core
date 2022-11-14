import { getMockReq, getMockRes } from '@jest-mock/express'
import { mock, MockProxy, mockReset } from 'jest-mock-extended'
import { makeUserLogin } from '../../../controller/authController'
import { IAuthData } from '../../../interfaces/auth/auth.interface'
import { userActions } from '../../../services/user'

let mockUserActions: MockProxy<typeof userActions>
let mockReq: any
let mockRes: any

const password = 'test'
const payload: IAuthData = {
  email: 'test@example.com',
  password,
}

jest.mock('bcrypt', () => {
  return {
    compare: (str1: string, str2: string) => {
      return str1 === password
    },
  }
})
jest.mock('../../../infra/repositories/user.repository', () => {
  return {
    userRepository: {
      createQueryBuilder: (data: any) => ({
        addSelect: (select: any) => ({
          where: (where: any) => ({ getOne: () => payload }),
        }),
      }),
    },
  }
})

describe('User module behaviour', () => {
  beforeAll(() => {
    mockUserActions = mock<typeof userActions>()

    mockReq = getMockReq()
    ;({ res: mockRes } = getMockRes())
  })

  afterEach(() => {
    mockReset(mockUserActions)
    mockReset(mockUserActions)
    jest.clearAllMocks()
  })

  it('Should log in a user', async () => {
    mockReq.body = payload
    await makeUserLogin(mockReq, mockRes)

    expect(mockRes.send).toHaveBeenCalled()
    expect(mockRes.status).toBeCalledWith(200)
  })

  it('Should not log in wrong password', async () => {
    payload['password'] = 'test2@gmail.com'
    mockReq.body = payload
    await makeUserLogin(mockReq, mockRes)

    expect(mockRes.json).toHaveBeenCalled()
    expect(mockRes.status).toBeCalledWith(400)
  })
})
