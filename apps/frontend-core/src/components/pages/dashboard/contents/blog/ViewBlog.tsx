import ButtonExtended from '@/components/ui/ButtonExtended'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import styles from '@/styles/markdown.module.scss'
import { FileEdit, View } from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { IBlog } from 'validation/types'

interface Props {
  blog: IBlog
}

export default function ViewBlog({ blog }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonExtended icon={<View />} type="button" size="sm">
          View Blog
        </ButtonExtended>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Blog</DialogTitle>
        </DialogHeader>
        <ReactMarkdown className={styles.markdown}>
          {blog.blogContent}
        </ReactMarkdown>
        <DialogFooter>
          <Link href={`/dashboard/update/blog/${blog._id}`}>
            <ButtonExtended icon={<FileEdit />} type="submit">
              Edit Blog
            </ButtonExtended>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
