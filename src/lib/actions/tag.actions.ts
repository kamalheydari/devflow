'use server'

import { Question, Tag, User } from '@/models'
import { connectedToDatabase } from '../mongoose'
import { GetAllTagsParams, GetQuestionsByTagIdParams, GetTopInteractedTagsParams } from './shared.types'

import type { FilterQuery } from 'mongoose'
import type { ITag } from '@/models/tag.model'

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectedToDatabase()

    const { userId } = params

    const user = await User.findById(userId)

    if (!user) throw new Error('User not found')

    // find interactions for the user and group by tagss
    // Interactions...

    return [
      { _id: '1', name: 'tag1' },
      { _id: '2', name: 'tag2' },
      { _id: '3', name: 'tag3' },
    ]
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectedToDatabase()

    const { searchQuery, filter, page = 1, pageSize = 8 } = params

    const skipAmount = (page - 1) * pageSize

    const query: FilterQuery<typeof Tag> = {}

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, 'i') } }]
    }

    let sortOptions = {}

    switch (filter) {
      case 'popular':
        sortOptions = { questions: -1 }
        break

      case 'recent':
        sortOptions = { createdAt: -1 }
        break

      case 'name':
        sortOptions = { name: 1 }
        break

      case 'old':
        sortOptions = { createdAt: -1 }
        break

      default:
        break
    }

    const tags = await Tag.find(query).sort(sortOptions).skip(skipAmount).limit(pageSize)

    const totalTags = await Tag.countDocuments(query)

    const isNext = totalTags > skipAmount + tags.length

    return { tags, isNext }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectedToDatabase()

    const { tagId, page = 1, pageSize = 8, searchQuery } = params
    const skipAmount = (page - 1) * pageSize

    const tagFilter: FilterQuery<ITag> = { _id: tagId }

    const tag = await Tag.findOne(tagFilter).populate({
      path: 'questions',
      model: Question,
      match: searchQuery ? { title: { $regex: searchQuery, $options: 'i' } } : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1,
      },
      populate: [
        { path: 'tags', model: Tag, select: '_id name' },
        { path: 'author', model: User, select: '_id clerckId name picture' },
      ],
    })

    if (!tag) {
      throw new Error('Tag not found')
    }

    const isNext = tag.questions.length > pageSize

    const questions = tag.questions

    return { tagTitle: tag.name, questions, isNext }
  } catch (error) {
    console.log(error)
    throw error
  }
}

export async function getTopPopularTags() {
  try {
    connectedToDatabase()
    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: '$questions' } } },
      {
        $sort: { numberOfQuestions: -1 },
      },
      { $limit: 5 },
    ])
    return popularTags
  } catch (error) {
    console.log(error)
    throw error
  }
}

// export async function (params: ) {
//   try {
//     connectedToDatabase()

//     return {}
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// }
