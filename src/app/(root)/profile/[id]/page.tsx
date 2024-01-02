import { AnswersTab, ProfileLink, QuestionTab, Stats } from '@/components/shared'
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { getUserInfo } from '@/lib/actions'
import { getJoinedDate } from '@/lib/utils'
import { URLProps } from '@/types'
import { SignedIn, auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

const Page: React.FC<URLProps> = async (props) => {
  const { params, searchParams } = props
  const { userId: clerkId } = auth()

  const userInfo = await getUserInfo({
    userId: params.id,
  })

  return (
    <>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Image
            src={userInfo?.user.picture}
            alt="profile picture"
            width={140}
            height={140}
            className="rounded-full object-cover"
          />

          <div className="mt-3">
            <h2 className="h2-bold text-dark100_light900">{userInfo.user.name}</h2>
            <p className="paragraph-regular text-dark200_light800">@{userInfo.user.username}</p>

            <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
              {userInfo.user.portfolioWebsite && (
                <ProfileLink href={userInfo.user.portfolioWebsite} title="Portfolio" imgUrl="/assets/icons/link.svg" />
              )}

              {userInfo.user.location && (
                <ProfileLink title={userInfo.user.location} imgUrl="/assets/icons/location.svg" />
              )}

              <ProfileLink title={getJoinedDate(userInfo.user.joinedAt)} imgUrl="/assets/icons/calendar.svg" />
            </div>
            {userInfo.user.bio && <p className="paragraph-regular text-dark400_light800 mt-8">{userInfo.user.bio}</p>}
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3 ">
          <SignedIn>
            {clerkId === userInfo.user.clerkId && (
              <Link href="/profile/edit">
                <Button className="paragraph-medium btn-secondary text-dark300_light900 min-h-[46px] min-w-[175px] px-4 py-3">
                  Edit Profile
                </Button>
              </Link>
            )}
          </SignedIn>
        </div>
      </div>

      <Stats totalQuestions={userInfo.totalQuestions} totalAnswers={userInfo.totalAnswers} />

      <div className="mt-10 flex gap-10">
        <Tabs defaultValue="top-posts" className="flex-1">
          <TabsList className="background-light800_dark400 min-h-[42px] p-1">
            <TabsTrigger value="top-posts" className="tab">
              Top Posts
            </TabsTrigger>
            <TabsTrigger value="answrs" className="tab">
              Answrs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top-posts">
            {clerkId && (
              <QuestionTab
                page={searchParams?.page ? +searchParams.page : 1}
                userId={userInfo.user._id}
                clerkId={clerkId}
              />
            )}
          </TabsContent>
          <TabsContent value="answrs" className="flex w-full flex-col gap-6">
            {clerkId && (
              <AnswersTab
                page={searchParams?.page ? +searchParams.page : 1}
                userId={userInfo.user._id}
                clerkId={clerkId}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default Page