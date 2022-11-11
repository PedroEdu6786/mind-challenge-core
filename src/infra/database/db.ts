import { AppDataSource } from './data-source'

export const dbConfig = async () => {
  try {
    await AppDataSource.initialize()
    console.log('Database connection established successfully')
  } catch (err) {
    console.log(err)
  }
}
