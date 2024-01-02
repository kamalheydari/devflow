'use server'

import { Answer, Interaction, Question } from '@/models'
import { connectedToDatabase } from '../mongoose'
import { AnswerVoteParams, CreateAnswerParams, DeleteAnswerParams, GetAnswersParams } from './shared.types'
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

    const { questionId, sortBy, page = 1, pageSize = 1 } = params

    const skipAmount = (page - 1) * pageSize

    let sortOptions = {}

    switch (sortBy) {
      case 'highestUpvotes':
        sortOptions = { upvotes: -1 }
        break

      case 'lowestUpvotes':
        sortOptions = { upvotes: -1 }
        break

      case 'recent':
        sortOptions = { createdAt: -1 }
        break

      case 'old':
        sortOptions = { createdAt: 1 }
        break

      default:
        break
    }

    const answers = await Answer.find({ question: questionId })
      .populate('author', '_id clerkId name picture')
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize)

    const totalAnswer = await Answer.countDocuments({
      question: questionId,
    })
    const isNext = totalAnswer > skipAmount + answers.length

    return { answers, isNext }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function upvoteAnswer(params: AnswerVoteParams) {
  try {
    connectedToDatabase()

    const { hasdownVoted, hasupVoted, path, userId, answerId } = params

    let updateQuery = {}

    if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId } }
    } else if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId }, $push: { upvotes: userId } }
    } else {
      updateQuery = { $addToSet: { upvotes: userId } }
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true })

    if (!answer) {
      throw new Error('Answer not found')
    }

    // Increment author's reputation by +10 for upvoting a question
    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function downvoteAnswer(params: AnswerVoteParams) {
  try {
    connectedToDatabase()

    const { hasdownVoted, hasupVoted, path, userId, answerId } = params

    let updateQuery = {}

    if (hasdownVoted) {
      updateQuery = { $pull: { downvotes: userId } }
    } else if (hasupVoted) {
      updateQuery = { $pull: { upvotes: userId }, $push: { downvotes: userId } }
    } else {
      updateQuery = { $addToSet: { downvotes: userId } }
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, { new: true })

    if (!answer) {
      throw new Error('Answer not found')
    }

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function deleteAnswer(params: DeleteAnswerParams) {
  try {
    connectedToDatabase()

    const { answerId, path } = params

    const answer = await Answer.findById(answerId)
    if (!answer) {
      throw new Error('Answer not found')
    }

    await Answer.deleteOne({ _id: answerId })
    await Question.updateMany({ _id: answer.question }, { $pull: { answers: answerId } })

    await Interaction.deleteMany({ answer: answerId })

    revalidatePath(path)
  } catch (error) {
    console.log(error)
    throw error
  }
}
