import { Request, Response, Router } from 'express'
import swaggerUi from 'swagger-ui-express'

import AccountRouter from './routes/account.routes'
import AuthRouter from './routes/auth.routes'
import LogsRouter from './routes/logs.routes'
import MemberRouter from './routes/member.routes'
import TeamRouter from './routes/team.routes'
import UserRouter from './routes/user.routes'
import { swaggerDocs } from './utils/swaggerConfig'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})
router.use('/users', UserRouter)
router.use('/accounts', AccountRouter)
router.use('/teams', TeamRouter)
router.use('/members', MemberRouter)
router.use('/auth', AuthRouter)
router.use('/logs', LogsRouter)

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

export default router
