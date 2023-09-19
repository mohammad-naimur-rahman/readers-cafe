/* eslint-disable no-unsafe-optional-chaining */
import ButtonExtended from '@/components/ui/ButtonExtended'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  data: {
    total: number
    page: number
    limit: number
  }
}

export default function PaginationFields({ data }: Props) {
  const isNextButtonDisabled = (): boolean => {
    const totalPages = Math.ceil(data?.total / data?.limit)
    return data?.page >= totalPages
  }
  return (
    <div className="flex items-center justify-center gap-1 py-10">
      <ButtonExtended
        className="min-w-[200px]"
        variant="outline"
        icon={<ChevronLeft />}
        disabled={data?.page <= 1}
      >
        Previous
      </ButtonExtended>
      <ButtonExtended
        className="min-w-[200px]"
        variant="outline"
        icon={<ChevronRight />}
        iconPosition="right"
        disabled={isNextButtonDisabled()}
      >
        Next
      </ButtonExtended>
    </div>
  )
}
