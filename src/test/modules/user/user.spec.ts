import request from 'supertest'
import server from '../../../index'
import { User } from '../../../interfaces/user/User'

const payload: User = {
  name: 'Pedro',
  email: 'pedro@gmail.com',
  password: 'password',
}

describe('User module behaviour', () => {
  it('Should return a new user', async () => {
    const res = await request(server).post('/users').send(payload)
    expect(res.body).toEqual(payload)
    expect(res.statusCode).toBe(201)
  })

  it('Should fail if missing attributes email, name or password', async () => {
    const payload = {}
    const res = await request(server).post('/users').send(payload)
    expect(res.statusCode).toBe(400)
    expect(res.body).toHaveProperty('message')
    expect(res.body).toHaveProperty('error')
  })

  it('Should return a user by id', async () => {
    const res = await request(server).get(`/users/${1}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('name')
    expect(res.body).toHaveProperty('email')
    expect(res.body).toHaveProperty('password')
  })
})
