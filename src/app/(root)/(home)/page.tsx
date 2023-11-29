import Link from 'next/link'

import { HomePageFilters } from '@/constants/filters'
import { getQuestions } from '@/lib/actions'

import { Button } from '@/components/ui'
import { Filter, LocalSearchbar, NoResult } from '@/components/shared'
import { HomeFilters } from '@/components/home'
import { QuestionCard } from '@/components/cards'

export default async function Home() {
  const result = await getQuestions({})

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">Ask a Question</Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questionss"
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.questions && result?.questions.length > 0 ? (
          result?.questions.map((question) => (
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
            title="There’s no question to show"
            linkTitle="Ask a Question"
            link="/ask-question"
          />
        )}
      </div>
    </>
  )
}
