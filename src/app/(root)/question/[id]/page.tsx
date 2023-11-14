import { Answer, Metric, ParseHTML, RenderTag } from '@/components'
import { getQuestionById } from '@/lib/actions'
import { formatAndDivideNumber, getTimeStamp } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  params: { id: string }
}

const page: React.FC<Props> = async (props) => {
  const { params } = props

  const result = await getQuestionById({ questionId: params.id })

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link href={`/profile/${result.question.author.clerkId}`} className="flex items-center justify-start gap-1">
            <Image src={result.question.author.picture} className="rounded-full" width={22} height={22} alt="profile" />
            <p className="paragraph-semibold text-dark300_light700">{result.question.author.name}</p>
          </Link>
          <div className="flex justify-end">VOTING</div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">{result.question.title}</h2>
      </div>

      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          alt="clock icon"
          imgUrl="/assets/icons/clock.svg"
          textStyles="small-medium text-dark400_light800"
          title=" Askec"
          value={` asked ${getTimeStamp(result.question.createdAt)}`}
        />

        <Metric
          alt="message"
          imgUrl="/assets/icons/message.svg"
          textStyles="small-medium text-dark400_light800"
          title="Answers"
          value={formatAndDivideNumber(result.question.answers.length)}
        />

        <Metric
          alt="eye"
          imgUrl="/assets/icons/eye.svg"
          textStyles="small-medium text-dark400_light800"
          title="Views"
          value={formatAndDivideNumber(result.question.views)}
        />
      </div>

      <ParseHTML data={result.question.content} />

      <div>
        {result.question.tags.map((tag: { _id: string; name: string }) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} showCount={false} />
        ))}
      </div>

      <Answer />
    </>
  )
}

export default page
