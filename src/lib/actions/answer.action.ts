'use server'

import { Answer, Question } from '@/models'
import { connectedToDatabase } from '../mongoose'
import { CreateAnswerParams, GetAnswersParams } from './shared.types'
import { revalidatePath } from 'next/cache'

export async function createAnswer(params: CreateAnswerParams) {
  try {
    connectedToDatabase()

    const { author, content, path, question } = params

    const newAnswer = await Answer.create({ content, author, question })

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

export async function getAnswers(params: GetAnswersParams) {
  try {
    connectedToDatabase()

    const { questionId } = params
    console.log(questionId)

    const answers = await Answer.find({ question: questionId })
      .populate('author', '_id clerkId name picture')
      .sort({ createdAt: -1 })
console.log(answers)
    return { answers }
  } catch (error) {
    console.log(error)
    throw error
  }
}
