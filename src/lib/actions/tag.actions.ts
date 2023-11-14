'use server'

import { Tag, User } from '@/models'
import { connectedToDatabase } from '../mongoose'
import { GetAllTagsParams, GetTopInteractedTagsParams } from './shared.types'

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

export async function getAllTags (params:GetAllTagsParams ) {
  try {
    connectedToDatabase()

    const tags=await Tag.find({})

    return {tags}
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
