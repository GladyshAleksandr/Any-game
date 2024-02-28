import prisma from '@/lib/prisma'
import { compareHashedPassword } from '@/lib/utils/bcrypt/compareHashedPassword'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { usernameOrEmail, password } = req.body

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
      }
    })

    if (!user) return res.status(400).json({ error: 'You entered wrong username or password' })

    const isMatch = await compareHashedPassword(password, user.password)

    if (isMatch) {
      const token = jwt.sign({ usernameOrEmail }, password)
      res.status(200).json({ token })
    } else {
      res.status(401).json({ error: 'Invalid credentials' })
    }
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
