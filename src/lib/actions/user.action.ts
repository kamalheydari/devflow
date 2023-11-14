'use server'

import { connectedToDatabase } from '@/lib/mongoose'
import { Question, User } from '@/models'
import { CreateUserParams, DeleteUserParams, GetAllUsersParams, UpdateUserParams } from './shared.types'
import { revalidatePath } from 'next/cache'

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

export async function createUser(userData: CreateUserParams) {
  try {
    connectedToDatabase()

    const newUser = await User.create(userData)

    return newUser
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectedToDatabase()

    const { clerkId, path, updateData } = params

    await User.findOneAndUpdate({ clerkId }, updateData, { new: true })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectedToDatabase()

    const { clerkId } = params

    const user = await User.findOneAndDelete({ clerkId })

    if (!user) {
      throw new Error('User not found')
    }

    // get user question ids
    // const userQuestionIds = await Question.find({ author: user._id }).distinct

    // delete user questions
    await Question.deleteMany({ author: user._id })

    const deletedUser = await User.findByIdAndDelete(user._id)

    return deletedUser
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectedToDatabase()

    // const { filter, searchQuery, page = 1, pageSize = 20 } = params

    const users = await User.find({}).sort({ createdAt: -1 })
    return { users }
  } catch (error) {
    console.log(error)
    throw error
  }
}
