'use server'

import { connectedToDatabase } from '@/lib/mongoose'
import { Question, Tag, User } from '@/models'
import { CreateQuestionParams, GetQuestionByIdParams, GetQuestionsParams } from './shared.types'
import { revalidatePath } from 'next/cache'

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectedToDatabase()

    const questions = await Question.find()
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 })
    return { questions }
  } catch (error) {}
}

export async function createQuestion(params: CreateQuestionParams) {
  try {
    connectedToDatabase()

    const { title, content, tags, author, path } = params

    // Create the question
    const question = await Question.create({
      title,
      content,
      author,
    })

    const tagDocument = []

    // Create the tags or get them if they already exist
    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: { $regex: new RegExp(`^${tag}$`, 'i') },
        },
        { $setOnInsert: { name: tag }, $push: { question: question._id } },
        { upsert: true, new: true }
      )

      tagDocument.push(existingTag._id)
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocument } },
    })

    // Create an interaction record for the user'a ask_question action

    // Increament author's reputation by +5 for createing a question
    revalidatePath(path)
  } catch (error) {}
}

export async function getQuestionById(params: GetQuestionByIdParams) {
  try {
    connectedToDatabase()

    const { questionId } = params

    const question = await Question.findById(questionId)
      .populate({ path: 'tags', model: Tag, select: '_id name' })
      .populate({ path: 'author', model: User, select: 'clerkId picture name' })

    return { question }
  } catch (error) {
    console.log(error)
    throw error
  }
}
