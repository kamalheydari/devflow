'use server'

import { Answer, Question } from '@/models'
import { connectedToDatabase } from '../mongoose'
import { CreateAnswerParams } from './shared.types'
import { revalidatePath } from 'next/cache'

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectedToDatabase()

    const { author, content, path, question } = params

    const newAnswer = new Answer({ content, author, question })

    // add the answer to the questions answers array
    await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    })

    // Todo: add interactions...

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}
