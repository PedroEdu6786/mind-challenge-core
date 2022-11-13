import 'reflect-metadata'
import dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

dotenv.config()

const { HOSTNAME, DB_PORT, USERNAME, PASSWORD, DB_NAME } = process.env

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: HOSTNAME,
  port: Number(DB_PORT),
  username: USERNAME,
  password: PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['dist/dtos/**/*.dto.{js,ts}'],
  migrations: [],
  subscribers: [],
  namingStrategy: new SnakeNamingStrategy(),
})
