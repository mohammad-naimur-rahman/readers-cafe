import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '../../button'
import { Card } from '../../card'

interface Props {
  link: string
  contentType: string
  fixedSize?: boolean
  className?: string
}

export default function ShowAllCard({
  link,
  contentType,
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
