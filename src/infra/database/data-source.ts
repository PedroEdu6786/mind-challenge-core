import 'reflect-metadata'
import { DataSource } from 'typeorm'
// import { User } from '../../entities/User'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'qwerty',
  database: 'mind_challenge',
  synchronize: true,
  logging: false,
  entities: ['dist/dtos/**/*.dto.{js,ts}'],
  migrations: [],
  subscribers: [],
})

// export const AppDataSource = new DataSource({
//   type: 'mysql',
//   host: HOSTNAME,
//   port: Number(PORT),
//   username: USERNAME,
//   password: PASSWORD,
//   database: DB_NAME,
//   synchronize: true,
//   logging: false,
//   entities: ['dist/dtos/**/*.js'],
//   migrations: [],
//   subscribers: [],
// })
