import ButtonExtended from '@/components/ui/ButtonExtended'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FileEdit, Trash2 } from 'lucide-react'
import { IDiscussion } from 'validation/types'

interface Props {
  discussion: IDiscussion
}

export default function DiscussionCard({ discussion }: Props) {
  return (
    <Card>
      <CardHeader className="p-3">
        <CardTitle className="text-lg">{discussion.topic}</CardTitle>
      </CardHeader>
      <p className="px-2 pt-3">
        <span className="font-semibold">Total comment: </span>
        {discussion.comments.length}
      </p>
      <CardFooter className="flex justify-between flex-wrap gap-2 pb-2 pt-5 px-2">
        <ButtonExtended icon={<FileEdit />} type="submit">
          Edit Discussion
        </ButtonExtended>
        <ButtonExtended icon={<Trash2 />} variant="destructive" size="sm">
          Delete Discussion
        </ButtonExtended>
      </CardFooter>
    </Card>
  )
}
