import { QuestionFilters } from '@/constants/filters'
import { getSavedQuestions } from '@/lib/actions'

import { Filter, LocalSearchbar, NoResult } from '@/components/shared'
import { QuestionCard } from '@/components/cards'
import { auth } from '@clerk/nextjs'
import { SearchParamsProps } from '@/types'

export default async function Collection({ searchParams }: SearchParamsProps) {
  const { userId } = auth()

  if (!userId) return null

  const result = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
  })

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questionss"
          otherClasses="flex-1"
        />

        <Filter filters={QuestionFilters} otherClasses="min-h-[56px] sm:min-w-[170px]" />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.questions && result?.questions.length > 0 ? (
          result?.questions.map((question:any) => (
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
            title="There’s no saved question to show"
            linkTitle="Ask a Question"
            link="/ask-question"
          />
        )}
      </div>
    </>
  )
}
