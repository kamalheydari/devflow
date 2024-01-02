import { getUserAnswers } from '@/lib/actions'
import { AnswerCard } from '@/components/cards'
import { Pagination } from '@/components/shared'

interface Props {
  userId: string
  clerkId?: string | null
  page: number
}

const AnswersTab: React.FC<Props> = async (props) => {
  const { userId, clerkId, page } = props

  const result = await getUserAnswers({
    userId,
    page,
  })

  return (
    <>
      {result.answers.map((item) => (
        <AnswerCard
          key={item._di}
          clerkId={clerkId}
          _id={item._id}
          question={item.question}
          author={item.author}
          upvotes={item.upvotes.length}
          createdAt={item.createdAt}
        />
      ))}

      <Pagination isNext={result.isNext} pageNumber={page} />
    </>
  )
}

export default AnswersTab
