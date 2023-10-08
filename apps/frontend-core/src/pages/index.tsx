import RootLayout from '@/components/layouts/RootLayout'
import BlogCard from '@/components/ui/core/cards/BlogCard'
import DiscussionCard from '@/components/ui/core/cards/DiscussionCard'
import ShortContentCard from '@/components/ui/core/cards/ShortContentCard'
import ShowAllCard from '@/components/ui/core/cards/ShowAllCard'
import SummaryCard from '@/components/ui/core/cards/SummaryCard'
import Draggable from '@/components/ui/draggable'
import Typography from '@/components/ui/typrgraphy'
import { IResponse } from '@/types/IResponse'
import { fetcher } from '@/utils/fetcher'
import { qs } from '@/utils/formUtils/qs'
import { ReactElement } from 'react'
import { IBlog, IDiscussion, IShortContent, ISummary } from 'validation/types'

interface Props {
  summaries: IResponse<ISummary>
  blogs: IResponse<IBlog>
  discussions: IResponse<IDiscussion>
  shortContents: IResponse<IShortContent>
}

export default function IndexPage({
  summaries,
  blogs,
  discussions,
  shortContents,
}: Props) {
  return (
    <div className="px-5">
      <Typography variant="h2" className="p-5">
        Summaries
      </Typography>
      <Draggable>
        {summaries?.data?.map(summary => (
          <SummaryCard key={summary._id} summary={summary} fixedSize />
        ))}
        <ShowAllCard contentType="Summaries" link="/summaries" fixedSize />
      </Draggable>

      <Typography variant="h2" className="p-5 pt-16">
        Blogs
      </Typography>
      <Draggable>
        {blogs?.data?.map(blog => (
          <BlogCard key={blog._id} blog={blog} fixedSize />
        ))}
        <ShowAllCard contentType="Blogs" link="/blogs" fixedSize />
      </Draggable>

      <Typography variant="h2" className="p-5 pt-16">
        Discussions
      </Typography>
      <Draggable>
        {discussions?.data?.map(discussion => (
          <DiscussionCard
            key={discussion._id}
            discussion={discussion}
            fixedSize
          />
        ))}
        <ShowAllCard contentType="Discussions" link="/discussions" fixedSize />
      </Draggable>

      <Typography variant="h2" className="p-5 pt-16">
        Short Content
      </Typography>
      <Draggable>
        {shortContents?.data?.map(shortContent => (
          <ShortContentCard
            key={shortContent._id}
            shortContent={shortContent}
            fixedSize
          />
        ))}
        <ShowAllCard
          contentType="Short Contents"
          link="/short-contents"
          fixedSize
        />
      </Draggable>
    </div>
  )
}

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout title="Reader's café | Home">{page}</RootLayout>
}

export async function getStaticProps() {
  const query = {
    page: 1,
    limit: 6,
    published: true,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  }

  const QueryString = qs(query)

  const summaries = await fetcher('summaries', QueryString)
  const blogs = await fetcher('blogs', QueryString)
  const discussions = await fetcher('discussions', QueryString)
  const shortContents = await fetcher('short-contents', QueryString)
  return {
    props: {
      summaries,
      blogs,
      discussions,
      shortContents,
    },
    revalidate: 60,
  }
}
