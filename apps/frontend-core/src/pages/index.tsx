import RootLayout from '@/components/layouts/RootLayout'
import SummaryCard from '@/components/ui/core/cards/SummaryCard'
import Draggable from '@/components/ui/draggable'
import Typography from '@/components/ui/typrgraphy'
import { IResponse } from '@/types/IResponse'
import { fetcher } from '@/utils/fetcher'
import { ReactElement } from 'react'
import { ISummary } from 'validation/types'

interface Props {
  summaries: IResponse<ISummary>
}

export default function IndexPage({ summaries }: Props) {
  return (
    <div>
      <Typography variant="h2">Summaries</Typography>
      <Draggable>
        {summaries.data.map(summary => (
          <SummaryCard key={summary._id} summary={summary} fixedSize />
        ))}
        <SummaryCard summary={summaries.data[0]} fixedSize showAll />
      </Draggable>
    </div>
  )
}

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout title="Reader's café | Home">{page}</RootLayout>
}

export async function getStaticProps() {
  const summaries = await fetcher('summaries', 'page=1&limit=6&published=true')
  return {
    props: {
      summaries,
    },
    revalidate: 10,
  }
}
