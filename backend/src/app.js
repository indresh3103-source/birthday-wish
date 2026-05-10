import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config/env.js'
import { errorHandler, notFound } from './middleware/error.js'
import apiRoutes from './routes/api.js'

const app = express()
app.set('trust proxy', 1)
app.use(helmet())
app.use(cors({ origin: env.clientUrl, credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 120 }))
app.use('/uploads', express.static('uploads'))
app.use('/api', apiRoutes)
app.use(notFound)
app.use(errorHandler)

export default app
