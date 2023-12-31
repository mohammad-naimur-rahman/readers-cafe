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
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

interface Props {
  summary: string
  id: string
}

export default function ViewSummary({ summary, id }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ButtonExtended icon={<View />} type="button" size="sm">
          View Summary
        </ButtonExtended>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Summary</DialogTitle>
        </DialogHeader>
        <ReactMarkdown className={styles.markdown}>{summary}</ReactMarkdown>
        <DialogFooter>
          <DialogClose>
            <Link href={`/dashboard/update/summary/${id}`}>
              <ButtonExtended icon={<FileEdit />} type="submit">
                Edit Summary
              </ButtonExtended>
            </Link>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
