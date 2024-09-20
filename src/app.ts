import express, { Router } from 'express'
import bodyParser from 'body-parser'

import { measureRoute } from './core/routes/measure-route'

export const app = express()

app.use(
  bodyParser.json({
    limit: '50mb',
  })
)

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true,
  })
)

const router = Router()
app.use(router)

measureRoute(router)
