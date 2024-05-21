import prisma from '@/lib/prisma'
import Auth from '@/lib/ui/types/Auth'
import { NextApiRequest, NextApiResponse } from 'next'
import { hashPassword } from '@/lib/utils/bcrypt/hashPassword'
import { compareHashedPassword } from '@/lib/utils/bcrypt/compareHashedPassword'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, email, password }: Auth = req.body

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }]
      }
    })

    if (user) {
      if (!user.password)
        return res.status(400).json({
          message:
            'No password associated with this account, because you signed up via Google. Please sign in via Google'
        })

      if (
        !user.isVerified &&
        username === user.username &&
        email === user.email &&
        (await compareHashedPassword(password, user.password!))
      ) {
        return res
          .status(200)
          .json({ message: 'Please verify your email', isVerificationRequired: true })
      }

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

    res.status(200).json({
      message: 'Please verify your email',
      isVerificationRequired: true
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
