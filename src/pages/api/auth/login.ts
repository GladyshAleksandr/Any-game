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

    if (!user) return res.status(400).json({ message: 'You entered wrong username or password' })

    if (!user.password)
      return res
        .status(400)
        .json({
          message:
            'No password associated with this account, because you signed up via Google. Please sign in via Google'
        })

    const isMatch = await compareHashedPassword(password, user.password)

    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '30d'
    })

    res.setHeader(
      'Set-Cookie',
      `jwtToken=${token}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Strict`
    )

    res.status(200).json({ message: 'Authorized' })
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
