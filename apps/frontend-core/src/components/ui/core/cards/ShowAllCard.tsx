import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '../../button'
import { Card } from '../../card'

interface Props {
  link: string
  contentType: string
  fixedSize?: boolean
}

export default function ShowAllCard({ link, contentType, fixedSize }: Props) {
  return (
    <Card
      className={cn('bg-secondary', {
        'flex-shrink-0 w-96': fixedSize,
      })}
    >
      <div className="flex items-center justify-center h-full">
        <Link href={link}>
          <Button variant="link" className="text-lg">
            Show all {contentType}
          </Button>
        </Link>
      </div>
    </Card>
  )
}
