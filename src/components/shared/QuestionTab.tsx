import { getUserQuestions } from '@/lib/actions'
import { QuestionCard } from '@/components/cards'

interface Props {
  userId: string
  clerkId?: string | null
}

const QuestionTab: React.FC<Props> = async (props) => {
  const { userId, clerkId } = props

  const result = await getUserQuestions({ userId, page: 1 })

  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
          answers={question.answers}
          author={question.author}
          createdAt={question.createdAt}
          tags={question.tags}
          title={question.title}
          upvotes={question.upvotes}
          views={question.views}
        />
      ))}
    </>
  )
}

export default QuestionTab
