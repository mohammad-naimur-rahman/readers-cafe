import ButtonExtended from '@/components/ui/ButtonExtended'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Img from '@/components/ui/img'
import { cn } from '@/lib/utils'
import styles from '@/styles/markdown.module.scss'
import { splitMarkdown } from '@/utils/splitMarkdown'
import { View } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { IBlog } from 'validation/types'
import { Button } from '../../button'

interface Props {
  blog: IBlog
  fixedSize?: boolean
  showAll?: boolean
}

export default function BlogCard({ blog, fixedSize, showAll }: Props) {
  return (
    <Card
      className={cn('w-96 bg-secondary', {
        'flex-shrink-0 w-96': fixedSize,
      })}
    >
      {showAll ? (
        <div className="flex items-center justify-center h-full">
          <Link href="/blogs">
            <Button variant="link" className="text-lg">
              Show all blogs
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <CardHeader>
            <CardTitle>{blog.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Img
              src={blog.coverImage}
              alt={blog.title}
              className="aspect-blog"
            />
            <p className="px-2 pt-3">
              <span className="font-semibold">Total comment: </span>
              {blog.comments.length}
            </p>
            <div className="p-2">
              <ReactMarkdown className={styles.markdown}>
                {splitMarkdown(blog.blogContent, 200)}
              </ReactMarkdown>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end flex-wrap gap-2 pb-2 pt-5 px-2">
            <ButtonExtended icon={<View />} size="sm">
              View Blog
            </ButtonExtended>
          </CardFooter>
        </>
      )}
    </Card>
  )
}
