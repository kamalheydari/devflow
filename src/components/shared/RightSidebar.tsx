import Image from 'next/image'
import Link from 'next/link'

import { RenderTag } from '@/components/shared'

const popularTags = [
  { _id: '1', name: 'javascript', totalQuestions: 53 },
  { _id: '2', name: 'react', totalQuestions: 12 },
  { _id: '3', name: 'vue', totalQuestions: 5 },
  { _id: '4', name: 'nextjs', totalQuestions: 8 },
  { _id: '5', name: 'redux', totalQuestions: 15 },
]

const hotQuestions = [
  {
    _id: 1,
    title:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo id eaque, illum quia qui nisi? Odio fuga doloremque veniam explicabo.',
  },
  {
    _id: 2,
    title: 'Illo id eaque, illum quia qui nisi? Odio fuga doloremque veniam explicabo.',
  },
  {
    _id: 3,
    title: 'Lorem ipsum dolor sit explicabo.',
  },
  {
    _id: 4,
    title: 'Odio fuga doloremque veniam explicabo.',
  },
  {
    _id: 5,
    title: 'illum quia qui nisi? Odio fuga doloremque veniam explicabo.',
  },
]

const RightSidebar = () => {
  return (
    <aside className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen w-[350px]  flex-col overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              key={question._id}
              href={`/questions/${question._id}`}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{question.title}</p>
              <Image
                src="/assets/icons/chevron-right.svg"
                alt="chevron right"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map((tag) => (
            <RenderTag key={tag._id} _id={tag._id} name={tag.name} totalQuestions={tag.totalQuestions} showCount />
          ))}
        </div>
      </div>
    </aside>
  )
}
export default RightSidebar
