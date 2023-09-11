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
import { DialogClose } from '@radix-ui/react-dialog'
import { FileEdit, View } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export default function ViewBlog({ blog }) {
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
        <ReactMarkdown className={styles.markdown}>{blog}</ReactMarkdown>
        <DialogFooter>
          <DialogClose>
            <ButtonExtended icon={<FileEdit />} type="submit">
              Edit Blog
            </ButtonExtended>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
