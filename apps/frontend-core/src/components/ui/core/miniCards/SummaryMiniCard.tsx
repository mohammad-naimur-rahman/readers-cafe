import { ISummary } from 'validation/types'

interface Props {
  summary: ISummary
}

export default function SummaryMiniCard({ summary }: Props) {
  console.log(summary)
  return (
    <div>
      <h6>Hello</h6>
    </div>
  )
}
