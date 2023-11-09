'use server'

import { connectedToDatabase } from '@/lib/mongoose'
import { User } from '@/models'

export async function getUserById(params: any) {
  try {
    connectedToDatabase()

    const { userId } = params

    const user = await User.findOne({ clerkId: userId })

    return user
  } catch (error) {
    console.log(error)
    throw error
  }
}
