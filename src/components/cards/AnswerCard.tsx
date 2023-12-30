import { formatAndDivideNumber, getTimeStamp } from '@/lib/utils'
import Link from 'next/link'
import { EditDeleteAction, Metric } from '@/components/shared'
import { SignedIn } from '@clerk/nextjs'

interface Props {
  clerkId?: string | null
  _id: string
  question: { _id: string; title: string }
  author: { _id: string; clerkId: string; name: string; picture: string }
  upvotes: number
  createdAt: Date
}

const AnswerCard: React.FC<Props> = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { _id, author, createdAt, question, upvotes, clerkId } = props

  const showActionButtons = clerkId && clerkId === author.clerkId

  return (
    <Link href={`/question/${question._id}/#${_id}`} className="card-wrapper rounded-[10px] px-11 py-9">
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">{question.title}</h3>
        </div>
        <SignedIn>
          {showActionButtons ? <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} /> : null}
        </SignedIn>
      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          alt="user"
          imgUrl={author.picture}
          textStyles="body-medium text-dark400_light700"
          title={``}
          value={author.name}
          isAuthor
          href={`/profile/${author._id}`}
        />
        <Metric
          alt="Upvotes"
          imgUrl="/assets/icons/like.svg"
          textStyles="small-medium text-dark400_light800"
          title="Votes"
          value={formatAndDivideNumber(upvotes)}
        />
      </div>
    </Link>
  )
}

export default AnswerCard
