import { Request, Response, Router } from 'express'
import UserRouter from './routes/user'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})
router.use('/users', UserRouter)

export default router
