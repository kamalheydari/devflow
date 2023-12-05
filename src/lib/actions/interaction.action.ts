'use server'

import { connectedToDatabase } from '@/lib/mongoose'
import { ViewQuestionParams } from './shared.types'
import { Question } from '@/models'
import Interaction from '@/models/interaction.model'

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectedToDatabase()

    const { questionId, userId } = params

    // update view count for question
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } })

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: 'view',
        question: questionId,
      })

      if (existingInteraction) return console.log('User has already viewed.')

      // create Interaction
      await Interaction.create({
        user: userId,
        action: 'view',
        question: questionId,
      })
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}
