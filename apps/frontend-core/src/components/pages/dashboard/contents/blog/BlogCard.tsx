import ButtonExtended from '@/components/ui/ButtonExtended'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Img from '@/components/ui/img'
import { Trash2 } from 'lucide-react'
import { IBlog } from 'validation/types'
import ViewBlog from './ViewBlog'

interface Props {
  blog: IBlog
}

export default function BlogCard({ blog }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{blog.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Img src={blog?.coverImage} alt={blog.title} className="aspect-blog" />
      </CardContent>
      <CardFooter className="flex justify-between flex-wrap gap-2 pb-2 pt-5 px-2">
        <ViewBlog blog={blog.blogContent} />
        <ButtonExtended icon={<Trash2 />} variant="destructive" size="sm">
          Delete Blog
        </ButtonExtended>
      </CardFooter>
    </Card>
  )
}
