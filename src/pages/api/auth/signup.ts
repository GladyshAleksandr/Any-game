import prisma from '@/lib/prisma'
import Auth from '@/lib/ui/types/Auth'
import { NextApiRequest, NextApiResponse } from 'next'
import { hashPassword } from '@/lib/utils/bcrypt/hashPassword'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

async function sendConfirmationEmail(email: string, confirmationCode: string) {
  const msg = {
    to: email,
    from: 'any.game.official10@gmail.com',
    subject: 'Confirm Your Email Address',
    text: `Your confirmation code is: ${confirmationCode}`,
    html: `<p>Your confirmation code is: <strong>${confirmationCode}</strong></p>`
  }

  try {
    await sgMail.send(msg)
    console.log('Confirmation email sent')
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    throw new Error('Error sending confirmation email')
  }
}

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

    const code = Math.floor(100000 + Math.random() * 900000).toString() // 6-digit code

    const verificationCode = await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
      }
    })

    await sendConfirmationEmail(email, verificationCode.code)

    res.status(200).json({
      message: 'Please confirm your email',
      needToVerifyEmail: true
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error })
  }
}
