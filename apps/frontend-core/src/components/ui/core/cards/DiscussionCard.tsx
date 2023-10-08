import ButtonExtended from '@/components/ui/ButtonExtended'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatDate } from '@/utils/formateDate'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { MousePointerSquare } from 'lucide-react'
import Link from 'next/link'
import { IDiscussion, IUser } from 'validation/types'
import { Button } from '../../button'

interface Props {
  discussion: IDiscussion
  fixedSize?: boolean
  className?: string
}

export default function DiscussionCard({
  discussion,
  fixedSize,
  className,
}: Props) {
  const { id } = getIdAndToken()
  return (
    <Card
      className={cn(
        {
          'flex-shrink-0 w-96': fixedSize,
        },
        'shadow-xl border-0 flex flex-col justify-between',
        className,
      )}
    >
      <div className="p-3">
        <CardHeader className="p-0">
          <CardTitle className="text-lg font-semibold">
            {discussion.topic}
          </CardTitle>
        </CardHeader>
        {discussion?.description ? (
          <p className="pt-2">
            {discussion?.description?.substring(0, 200)}
            {discussion?.description?.length > 200 ? <span> ...</span> : null}
          </p>
        ) : null}
      </div>

      <div className="p-3">
        <p className="text-right">
          <span className="font-semibold">Total comment: </span>
          {discussion?.comments?.length}
        </p>

        <div className="flex items-center gap-1 justify-end">
          <p className="font-semibold">By</p>
          {discussion?.user?._id === id ? (
            <Button variant="link" className="p-0 m-0">
              <Link href="dashboard/profile">You</Link>
            </Button>
          ) : (
            <Button variant="link" className="p-0 m-0">
              <Link href={`users/${discussion?.user?._id}`}>
                {(discussion?.user as IUser)?.fullName}
              </Link>
            </Button>
          )}
        </div>
        <p className="text-right pb-4">{formatDate(discussion?.createdAt)}</p>

        <CardFooter className="flex justify-end flex-wrap gap-2 p-0">
          <ButtonExtended icon={<MousePointerSquare />}>
            View Discussion
          </ButtonExtended>
        </CardFooter>
      </div>
    </Card>
  )
}
