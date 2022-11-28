import express, { Express } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes'
import { logRoute } from './middleware/log'
import { errorHandler, notFound } from './middleware/errorMiddleware'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

dotenv.config()

const server: Express = express()
export const PORT = process.env.PORT || 4000

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app: server }),
  ],
  tracesSampleRate: 1.0,
})

server.use(Sentry.Handlers.requestHandler());
server.use(Sentry.Handlers.tracingHandler());
server.use(Sentry.Handlers.errorHandler());

server.use(cors())
server.use(express.json())
server.all('*', logRoute)

server.use('/api', router)

server.use(notFound)
server.use(errorHandler)

export default server
