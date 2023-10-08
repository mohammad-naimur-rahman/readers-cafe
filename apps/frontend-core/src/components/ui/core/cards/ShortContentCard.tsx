import ButtonExtended from '@/components/ui/ButtonExtended'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Img from '@/components/ui/img'
import { cn } from '@/lib/utils'
import { formatDate } from '@/utils/formateDate'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { MousePointerSquare } from 'lucide-react'
import Link from 'next/link'
import { IShortContent, IUser } from 'validation/types'
import { Button } from '../../button'

interface Props {
  shortContent: IShortContent
  fixedSize?: boolean
  className?: string
}

export default function ShortContentCard({
  shortContent,
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
      <div>
        <CardHeader className="px-3">
          <CardTitle className="text-lg">{shortContent?.caption}</CardTitle>
        </CardHeader>
        <div className="h-[350px]">
          {shortContent?.image?.url ? (
            <Img
              src={shortContent?.image}
              alt={shortContent?.caption}
              className="h-full w-auto mx-auto object-contain"
            />
          ) : null}
        </div>
      </div>

      <div className="p-3">
        <p className="text-right">
          <span className="font-semibold">Total comment: </span>
          {shortContent.comments.length}
        </p>

        <div className="flex items-center gap-1 justify-end">
          <p className="font-semibold">By</p>
          {shortContent?.user?._id === id ? (
            <Button variant="link" className="p-0 m-0">
              <Link href="dashboard/profile">You</Link>
            </Button>
          ) : (
            <Button variant="link" className="p-0 m-0">
              <Link href={`users/${shortContent?.user?._id}`}>
                {(shortContent?.user as IUser)?.fullName}
              </Link>
            </Button>
          )}
        </div>
        <p className="text-right pb-4">{formatDate(shortContent?.createdAt)}</p>

        <CardFooter className="flex justify-end flex-wrap gap-2 p-0">
          <ButtonExtended icon={<MousePointerSquare />}>
            View Content
          </ButtonExtended>
        </CardFooter>
      </div>
    </Card>
  )
}
