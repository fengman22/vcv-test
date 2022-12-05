import express, { Request, Response } from 'express'
import cors from 'cors'

import ApplianceRouter from './routers/ApplianceRouter'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/appliances', ApplianceRouter)

export default app
