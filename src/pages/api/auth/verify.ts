import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, code } = req.body

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user?.id) return res.status(400).json({ message: 'User not found' })

    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        userId: user.id
      }
    })

    if (verificationCode?.code === code)
      await prisma.user.update({
        where: {
          email
        },
        data: {
          isVerified: true
        }
      })
    else {
      if (!user?.id)
        return res
          .status(400)
          .json({ message: 'Incorrect code, please try again, or get a new code' })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: '30d'
    })

    res.setHeader(
      'Set-Cookie',
      `jwtToken=${token}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Strict`
    )

    res.status(200).json({
      message: 'User succesfully verified',
      isVerified: true
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
