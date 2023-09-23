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
import Link from 'next/link'
import { IDiscussion } from 'validation/types'
import { Button } from '../../button'

interface Props {
  discussion: IDiscussion
  fixedSize?: boolean
  showAll?: boolean
}

export default function DiscussionCard({
  discussion,
  fixedSize,
  showAll,
}: Props) {
  return (
    <Card
      className={cn('w-96 bg-secondary', {
        'flex-shrink-0 w-96': fixedSize,
      })}
    >
      {showAll ? (
        <div className="flex items-center justify-center h-full">
          <Link href="/discussions">
            <Button variant="link" className="text-lg">
              Show all discussions
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <CardHeader className="p-3">
            <CardTitle className="text-lg">{discussion.topic}</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            {discussion?.description ? <p>{discussion.description}</p> : null}
            <p className="pt-3">
              <span className="font-semibold">Total comment: </span>
              {discussion.comments.length}
            </p>
          </CardContent>
          <CardFooter className="flex justify-end flex-wrap gap-2 pb-2 pt-5 px-2">
            <ButtonExtended icon={<View />}>View Discussion</ButtonExtended>
          </CardFooter>
        </>
      )}
    </Card>
  )
}
