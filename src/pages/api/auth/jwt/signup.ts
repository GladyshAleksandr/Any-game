import prisma from '@/lib/prisma'
import Auth from '@/lib/ui/types/Auth'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, email, password }: Auth = req.body

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }]
      }
    })

    if (user) {
      if (user.username === username)
        return res.status(400).json({ error: 'Username already taken' })
      else return res.status(400).json({ error: 'Email already taken' })
    }

    const createdUser = await prisma.user.create({
      data: {
        username,
        email,
        password
      }
    })

    const token = jwt.sign({ username }, password)

    res.status(200).json({ data: { createdUser, token } })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}

function isEmail(value: string) {
  // Regular expression for validating email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}
