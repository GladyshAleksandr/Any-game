import prisma from '@/lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import { sendConfirmationEmail } from '@/lib/backend/utils/sendConfirmationEmail'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email } = req.body

    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if (!user) return res.status(400).json({ message: 'Something went wrong' })

    const code = Math.floor(100000 + Math.random() * 900000).toString() // 6-digit code
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)

    const verificationCode = await prisma.verificationCode.upsert({
      where: {
        userId: user.id
      },
      create: {
        userId: user.id,
        code,
        expires
      },
      update: {
        code,
        expires
      }
    })

    await sendConfirmationEmail(user.email, verificationCode.code)

    res.status(200).json({
      message: `New code was sent to ${user.email}`
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
