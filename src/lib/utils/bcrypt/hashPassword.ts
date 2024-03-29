import bcrypt from 'bcrypt'

export const hashPassword = async (password: string) => {
  try {
    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)

    return hash
  } catch (error) {
    throw new Error('Error hashing password')
  }
}
