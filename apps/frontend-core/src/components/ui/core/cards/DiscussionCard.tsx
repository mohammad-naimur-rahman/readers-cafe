import ButtonExtended from '@/components/ui/ButtonExtended'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { View } from 'lucide-react'
import { IDiscussion } from 'validation/types'

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
  return (
    <Card
      className={cn(
        {
          'flex-shrink-0 w-96': fixedSize,
        },
        'shadow-xl border-0',
        className,
      )}
    >
      <CardHeader className="p-3">
        <CardTitle className="text-lg font-semibold">
          {discussion.topic}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        {discussion?.description ? (
          <p>{discussion.description.substring(0, 200)}</p>
        ) : null}
        <p className="pt-3">
          <span className="font-semibold">Total comment: </span>
          {discussion.comments.length}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end flex-wrap gap-2 pb-2 pt-5 px-2">
        <ButtonExtended icon={<View />}>View Discussion</ButtonExtended>
      </CardFooter>
    </Card>
  )
}
