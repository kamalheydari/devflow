import { QuestionCard } from '@/components/cards'
import { LocalSearchbar, NoResult } from '@/components/shared'
import { getQuestionsByTagId } from '@/lib/actions/tag.actions'
import { IQuestion } from '@/models/question.model'

interface Props {
  params: { id: string }
  searchParams: { q: string }
}

const Page: React.FC<Props> = async (props) => {
  const { params, searchParams } = props

  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  })

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>
      <div className="mt-11 w-full">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag questionss"
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.questions && result?.questions.length > 0 ? (
          result?.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              answers={question.answers}
              author={question.author}
              createdAt={question.createdAt}
              tags={question.tags}
              title={question.title}
              upvotes={question.upvotes}
              views={question.views}
            />
          ))
        ) : (
          <NoResult
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next
        big thing others learn from. Get involved! 💡"
            title="There’s no tag question to show"
            linkTitle="Ask a Question"
            link="/ask-question"
          />
        )}
      </div>
    </>
  )
}

export default Page
