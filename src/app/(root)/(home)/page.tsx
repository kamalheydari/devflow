import { Button, Filter, HomeFilters, LocalSearchbar, NoResult, QuestionCard } from '@/components'
import { HomePageFilters } from '@/constants/filters'
import Link from 'next/link'

const questions = [
  {
    _id: '1',
    title: 'Cascading Deletes in SQLAlchemy?',
    tags: [
      { _id: '1', name: 'python' },
      { _id: '2', name: 'sql' },
    ],
    author: { _id: '1', name: 'John Doe', picture: 'John-Doe.ipg' },
    upvotes: 1050000,
    views: 14850,
    answers: [],
    createdAt: new Date('2023-10-22T12:00:00.000Z'),
  },
  {
    _id: '2',
    title: 'How to center a div?',
    tags: [
      { _id: '1', name: 'Css' },
      { _id: '2', name: 'sql' },
    ],
    author: { _id: '1', name: 'John Doe', picture: 'John-Doe.ipg' },
    upvotes: 150000,
    views: 150,
    answers: [],
    createdAt: new Date('2021-09-01T12:00:00.000Z'),
  },
]

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h[46px] px-4 py-3 !text-light-900">Ask a Question</Button>
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
        {questions.length > 0 ? (
          questions.map((question) => (
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
