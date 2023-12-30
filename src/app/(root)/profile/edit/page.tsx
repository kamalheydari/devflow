import { Profile } from '@/components/forms'
import { getUserById } from '@/lib/actions'
import { auth } from '@clerk/nextjs'
import type { ParamsProps } from '@/types'

const page: React.FC<ParamsProps> = async ({ params }) => {
  const { userId } = auth()

  if (!userId) return null

  const mongoUser = await getUserById({ userId })

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <div className="mt-9">
        <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </>
  )
}

export default page
