import { getUserAnswers } from '@/lib/actions'
import { AnswerCard } from '@/components/cards'

interface Props {
  userId: string
  clerkId?: string | null
}

const AnswersTab: React.FC<Props> = async (props) => {
  const { userId, clerkId } = props

  const result = await getUserAnswers({
    userId,
    page: 1,
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
    </>
  )
}

export default AnswersTab
