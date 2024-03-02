import prisma from '@/lib/prisma'
import Auth from '@/lib/ui/types/Auth'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import { hashPassword } from '@/lib/utils/bcrypt/hashPassword'

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
        return res.status(400).json({ message: 'Username already taken' })
      return res.status(400).json({ message: 'Email already taken' })
    }

    const hashedPassword = await hashPassword(password)
    const createdUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    })

    const token = jwt.sign({ userId: createdUser.id }, process.env.JWT_SECRET as string, {
      expiresIn: '30d'
    })

    res.setHeader(
      'Set-Cookie',
      `jwtToken=${token}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Strict`
    )

    res.status(200).json({ message: 'User created successfully' })
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
