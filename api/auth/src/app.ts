import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import cookieSession from 'cookie-session'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
)

app.post('/auth/signin', (req: Request, res: Response) => {
  const user = {
    id: 'abc123',
    email: 'test@vocovo.com',
  }

  const userJwt = jwt.sign(user, 'Jm27CvRnQjxdYsD.Wvuq')

  req.session = {
    jwt: userJwt,
  }

  res.json(user)
})

app.get('/auth/ping', (req, res) => {
  return res.json({ message: 'auth pong' })
})

export default app
