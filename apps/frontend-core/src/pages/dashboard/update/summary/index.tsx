import DashboardLayout from '@/components/layouts/DashboardLayout'
import { Input } from '@/components/ui/input'
import { API_URL } from '@/configs'
import { withAuth } from '@/utils/auth/withAuth'
import { getIdAndToken } from '@/utils/getIdAndToken'
import axios from 'axios'
import { ReactElement, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { ISummary } from 'validation/types'

export default function UpdateSummaryPageIndex() {
  const { token } = getIdAndToken()
  const [searchValue, setsearchValue] = useState('')
  const [debouncedValue] = useDebounce(searchValue, 500)
  const [searchedSummary, setsearchedSummary] = useState<ISummary[]>([])
  const [searching, setsearching] = useState(false)

  console.log(searchedSummary, searching)

  useEffect(() => {
    ;(async () => {
      if (debouncedValue) {
        setsearching(true)
        const result = await axios.get(
          `${API_URL}/summaries/my-contents?search=${debouncedValue}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setsearching(false)
        setsearchedSummary(result?.data?.data)
      } else {
        setsearching(false)
      }
    })()
  }, [debouncedValue, token])

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="text-3xl pt-3">Update Summary</h2>
      <Input
        placeholder="Enter Summary Title..."
        className="max-w-md"
        value={searchValue}
        onChange={e => setsearchValue(e.target.value)}
      />
    </div>
  )
}

UpdateSummaryPageIndex.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="Select A Summary | Reader's café">
      {page}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
