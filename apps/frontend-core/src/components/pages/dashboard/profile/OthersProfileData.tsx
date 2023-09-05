import { Skeleton } from '@/components/ui/skeleton'
import { IUser } from 'validation/types'

interface Props {
  isLoading: boolean
  userData: IUser
}

const Section = ({ topic, number }) => {
  return (
    <div className="flex items-center gap-3">
      <h2 className="text-2xl">
        Total {topic}: <span className="ml-3">{number}</span>
      </h2>
    </div>
  )
}

export default function OthersProfileData({ isLoading, userData }: Props) {
  if (isLoading) {
    return (
      <div className="self-start flex flex-col gap-6 ml-10 mt-10">
        <Skeleton className="h-9 w-60" />
        {[0, 1, 2, 3, 4].map(el => (
          <Skeleton key={el} className="h-8 w-64" />
        ))}
      </div>
    )
  }
  return (
    <section className="self-start flex flex-col gap-6 ml-10 mt-10">
      <h2 className="text-3xl text-left">Your contents</h2>
      <Section topic="Summaries" number={userData?.summaries?.length} />
      <Section topic="Blogs" number={userData?.summaries?.length} />
      <Section topic="Discussions" number={userData?.summaries?.length} />
      <Section topic="Short Contents" number={userData?.summaries?.length} />
    </section>
  )
}
