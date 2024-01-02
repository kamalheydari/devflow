import { getUserQuestions } from '@/lib/actions'
import { QuestionCard } from '@/components/cards'
import { Pagination } from '.'

interface Props {
  userId: string
  clerkId?: string | null
  page: number
}

const QuestionTab: React.FC<Props> = async (props) => {
  const { userId, clerkId, page } = props

  const result = await getUserQuestions({ userId, page })

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
      <Pagination isNext={result.isNext} pageNumber={page} />
    </>
  )
}

export default QuestionTab
