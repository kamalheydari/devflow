import { Question } from '@/components/forms'
import { getQuestionById, getUserById } from '@/lib/actions'
import { ParamsProps } from '@/types'
import { auth } from '@clerk/nextjs'

const page: React.FC<ParamsProps> = async ({ params }) => {
  const { userId } = auth()

  if (!userId) return null

  const mongoUser = await getUserById({ userId })
  const result = await getQuestionById({ questionId: params.id })

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <Question type="edit" mongoUserId={mongoUser?._id} questionDetails={JSON.stringify(result.question)} />
      </div>
    </>
  )
}

export default page
