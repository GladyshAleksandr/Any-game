import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    //  await someFunc()
    res.status(200).json({ message: 'Generation completed successfully.' })
  } catch (error) {
    console.error('Generation failed:', error)
    res.status(500).json({ error: 'Generation failed.' })
  }
}
