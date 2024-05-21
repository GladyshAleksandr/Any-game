import sendgrid from '@sendgrid/mail'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string)

export async function sendConfirmationEmail(email: string, confirmationCode: string) {
  const msg = {
    to: email,
    from: 'any.game.official10@gmail.com',
    subject: 'Confirm Your Email Address',
    text: `Your confirmation code is: ${confirmationCode}`,
    html: `<p>Your confirmation code is: <strong>${confirmationCode}</strong></p>`
  }

  try {
    await sendgrid.send(msg)
    console.log('Confirmation email sent')
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    throw new Error('Error sending confirmation email')
  }
}
