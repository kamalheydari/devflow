import { getTopInteractedTags } from '@/lib/actions/tag.actions'
import Image from 'next/image'
import Link from 'next/link'
import { Badge, RenderTag } from '@/components'

interface Props {
  user: {
    _id: string
    clerkId: string
    picture: string
    name: string
    username: string
  }
}

const UserCard: React.FC<Props> = async (props) => {
  const { user } = props

  const interactedTags = await getTopInteractedTags({ userId: user._id })

  return (
    <article className=" shadow-light100_darknone background-light900_dark200 light-border flex-center w-full flex-col rounded-2xl border  p-8 max-xs:min-w-full xs:w-[260px]">
      <Image src={user.picture} alt={user.username} width={100} height={100} className="rounded-full" />

      <div className="mt-4 text-center">
        <Link href={`/profile/${user.clerkId}`} className="">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">{user.name}</h3>
          <p className="body-regular text-dark500_light500 mt-2">{user.username}</p>
        </Link>
      </div>

      <div className="mt-5">
        {interactedTags.length > 0 ? (
          <div className="flex-center gap-2">
            {interactedTags.map((tag) => (
              <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
            ))}
          </div>
        ) : (
          <Badge>No tags yet</Badge>
        )}
      </div>
    </article>
  )
}

export default UserCard
