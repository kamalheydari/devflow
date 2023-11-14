import { Filter, LocalSearchbar, NoResult } from '@/components'
import { UserFilters } from '@/constants/filters'
import { getAllTags } from '@/lib/actions/tag.actions'
import Link from 'next/link'

export default async function Community() {
  const result = await getAllTags({})
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for amazing tags"
          otherClasses="flex-1"
        />

        <Filter filters={UserFilters} otherClasses="min-h-[56px] sm:min-w-[170px]" />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tag) => (
            <article
              key={tag._id}
              className="shadow-light100_darknone background-light900_dark200 light-border flex-center w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]"
            >
              <Link
                href={`/tags/${tag._id}`}
                className="background-light800_dark400 paragraph-semibold text-dark300_light900 w-fit rounded-sm px-5 py-1.5"
              >
                {tag.name}
              </Link>

              <p className="small-medium text-dark400_light500 mt-3.5">
                <span className="body-semibold primary-text-gradient mr-2.5">{tag.questions.length}+</span> Questions
              </p>
            </article>
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="It looks like there are no tags found."
            link="/ask-question"
            linkTitle="Ask a question"
          />
        )}
      </section>
    </>
  )
}
