import ButtonExtended from '@/components/ui/ButtonExtended'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Img from '@/components/ui/img'
import { cn } from '@/lib/utils'
import { formatDate } from '@/utils/formateDate'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { MousePointerSquare } from 'lucide-react'
import Link from 'next/link'
import { IBlog, IUser } from 'validation/types'
import { Button } from '../../button'

interface Props {
  blog: IBlog
  fixedSize?: boolean
  className?: string
}

export default function BlogCard({ blog, fixedSize, className }: Props) {
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
        <CardHeader className="p-4">
          <CardTitle>{blog.title}</CardTitle>
        </CardHeader>

        <Img src={blog.coverImage} alt={blog.title} className="aspect-blog" />
      </div>

      <div className="p-3">
        <p className="text-right">
          <span className="font-semibold">Total comment: </span>
          {blog.comments.length}
        </p>
        <div className="flex items-center gap-1 justify-end">
          <p className="font-semibold">By</p>
          {blog?.user?._id === id ? (
            <Button variant="link" className="p-0 m-0">
              <Link href="dashboard/profile">You</Link>
            </Button>
          ) : (
            <Button variant="link" className="p-0 m-0">
              <Link href={`users/${blog?.user?._id}`}>
                {(blog?.user as IUser)?.fullName}
              </Link>
            </Button>
          )}
        </div>
        <p className="text-right pb-4">{formatDate(blog?.createdAt)}</p>
        <CardFooter className="flex justify-end flex-wrap gap-2 p-0">
          <ButtonExtended icon={<MousePointerSquare />} size="sm">
            View Blog
          </ButtonExtended>
        </CardFooter>
      </div>
    </Card>
  )
}
