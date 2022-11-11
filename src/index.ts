import server, { PORT } from './server'
import { dbConfig } from './infra/database/db'

dbConfig().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
  })
})

export default server
