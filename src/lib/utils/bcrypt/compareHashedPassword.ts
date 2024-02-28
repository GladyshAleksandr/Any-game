import bcrypt from 'bcrypt'

export const compareHashedPassword = async (password: string, hashedPassword: string) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword)

    return match
  } catch (error) {
    throw new Error('Error comparing password')
  }
}
