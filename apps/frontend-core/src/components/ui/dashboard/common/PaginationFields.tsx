/* eslint-disable no-unsafe-optional-chaining */
import ButtonExtended from '@/components/ui/ButtonExtended'
import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  data: {
    total: number
    page: number
    limit: number
  }
  next: () => void
  previous: () => void
  show: boolean
}

export default function PaginationFields({
  data,
  next,
  previous,
  show,
}: Props) {
  const isNextButtonDisabled = (): boolean => {
    const totalPages = Math.ceil(data?.total / data?.limit)
    return data?.page >= totalPages
  }
  return (
    <div
      className={clsx('flex items-center justify-center gap-1 py-10', {
        hidden: !show,
      })}
    >
      <ButtonExtended
        className="min-w-[200px]"
        variant="outline"
        icon={<ChevronLeft />}
        disabled={data?.page <= 1}
        onClick={previous}
      >
        Previous
      </ButtonExtended>
      <ButtonExtended
        className="min-w-[200px]"
        variant="outline"
        icon={<ChevronRight />}
        iconPosition="right"
        disabled={isNextButtonDisabled()}
        onClick={next}
      >
        Next
      </ButtonExtended>
    </div>
  )
}
