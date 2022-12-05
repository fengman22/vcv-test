import express, { Request, Response } from 'express'

import applianceDB from './db'

const router = express.Router()

router.get('/list', (req: Request, res: Response) => {
  res.json(applianceDB)
})

export default router
