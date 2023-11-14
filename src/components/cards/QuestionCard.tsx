// Todo check styles with figma
import Link from 'next/link'
import { Metric, RenderTag } from '@/components'
import { formatAndDivideNumber, getTimeStamp } from '@/lib/utils'

interface Props {
  _id: string
  title: string
  tags: { _id: string; name: string }[]
  author: { _id: string; name: string; picture: string }
  upvotes: number
  views: number
  answers: Array<object>
  createdAt: Date
}

const QuestionCard: React.FC<Props> = (props) => {
  const { _id, answers, author, createdAt, tags, title, upvotes, views } = props
  return (
    <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
      <div className="flex flex-col items-start justify-between gap-5">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex">{getTimeStamp(createdAt)}</span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">{title}</h3>
          </Link>
        </div>
        {/* if signed in add edit delete actions */}
        <div className="mt-3.5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
          ))}
        </div>

        <div className="flex-between mt-6 w-full flex-wrap gap-3">
          <Metric
            alt="user"
            imgUrl={author.picture}
            textStyles="body-medium text-dark400_light700"
            title={` - asked ${getTimeStamp(createdAt)}`}
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

          <Metric
            alt="message"
            imgUrl="/assets/icons/message.svg"
            textStyles="small-medium text-dark400_light800"
            title="Answers"
            value={formatAndDivideNumber(answers.length)}
          />

          <Metric
            alt="eye"
            imgUrl="/assets/icons/eye.svg"
            textStyles="small-medium text-dark400_light800"
            title="Views"
            value={formatAndDivideNumber(views)}
          />
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
