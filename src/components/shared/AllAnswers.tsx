import Link from 'next/link'
import Image from 'next/image'

import { getAnswers } from '@/lib/actions/answer.action'

import { AnswerFilters } from '@/constants/filters'

import { getTimeStamp } from '@/lib/utils'

import { Filter, Pagination, ParseHTML, Votes } from '@/components/shared'

interface Props {
  userId: string
  questionId: string
  totalAnswers: number
  page?: string
  filter?: string
}

const AllAnswers: React.FC<Props> = async (props) => {
  const { questionId, totalAnswers, userId, page, filter } = props

  const result = await getAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  })

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {result.answers.map((answer) => (
          <article className="light-border border-b py-10" key={answer._id}>
            <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/profile/${answer.author.clerkId}`}
                className="flex flex-1 items-center gap-1 sm:items-center"
              >
                <Image
                  src={answer.author.picture}
                  width={18}
                  height={18}
                  alt="profile"
                  className="rounded-full object-cover max-sm:mt-0.5"
                />
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700">{answer.author.name}</p>

                  <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                    answered {getTimeStamp(answer.createdAt)}
                  </p>
                </div>
              </Link>
              <div className="flex justify-end">
                <Votes
                  type="Answer"
                  itemId={JSON.stringify(answer._id)}
                  userId={JSON.stringify(userId)}
                  upvotes={answer.upvotes.length}
                  downvotes={answer.downvotes.length}
                  hasupVoted={answer.upvotes.includes(userId)}
                  hasdownVoted={answer.downvotes.includes(userId)}
                />
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
      <Pagination isNext={result.isNext} pageNumber={page ? +page : 1} />
    </div>
  )
}

export default AllAnswers
