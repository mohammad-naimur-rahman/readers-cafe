import animationData from '@/assets/lottie/updating3.json'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import ManageUpdatedAuthors from '@/components/pages/dashboard/update/book/ManageUpdatedAuthors'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Overlay from '@/components/ui/overlay'
import { Textarea } from '@/components/ui/textarea'
import { initBookValues } from '@/constants/dashboard/initValues'
import {
  useGetBookQuery,
  useUpdateBookMutation,
} from '@/redux/features/book/bookApi'
import { IError } from '@/types/IError'
import { withAuth } from '@/utils/auth/withAuth'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useId, useState } from 'react'
import toast from 'react-hot-toast'
import { IAuthor, IBook } from 'validation/types'

export default function UpdateBookPage() {
  const formId = useId()
  const { push } = useRouter()
  const { query } = useRouter()
  const { token } = getIdAndToken()
  const { data } = useGetBookQuery(query.id)
  const [updateBook, { isLoading, isError, error, isSuccess }] =
    useUpdateBookMutation()

  const [book, setbook] = useState<IBook>(initBookValues)
  const [selectedAuthors, setselectedAuthors] = useState<IAuthor[]>(
    book?.authors as IAuthor[],
  )

  useEffect(() => {
    if (data?.data) {
      setbook(data.data)
      setselectedAuthors(data.data.authors)
    }
  }, [data])

  useEffect(() => {
    if (isError) toast.error((error as IError)?.data?.message)
    if (isSuccess) {
      toast.success('Book created successfully!')
      push('/dashboard/contents/books')
    }
  }, [error, isError, isSuccess, push])

  const handleUpdateBook = e => {
    e.preventDefault()

    if (!book.title || !book.authors.length || !book.genre) {
      toast.error('Please fill out the required fields!')
      return
    }

    updateBook({ payload: book, token, id: query.id })
  }
  return (
    <form className="max-w-4xl mx-auto space-y-5" onSubmit={handleUpdateBook}>
      <h2 className="text-3xl pt-3">Update Book</h2>

      <div className="space-y-2 flex flex-col">
        <Label htmlFor={`${formId}-title`}>Title *</Label>
        <Input
          placeholder="Book Title"
          value={book.title}
          onChange={e => setbook({ ...book, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2 flex flex-col">
        <Label htmlFor={`${formId}-description`}>Description</Label>
        <Textarea
          placeholder="Book Description"
          value={book.description}
          onChange={e => setbook({ ...book, description: e.target.value })}
        />
      </div>

      <div className="space-y-2 flex flex-col relative">
        <Label htmlFor={`${formId}-authors`}>Authors *</Label>
        <ManageUpdatedAuthors
          selectedAuthors={selectedAuthors}
          setselectedAuthors={setselectedAuthors}
          book={book}
          setbook={setbook}
        />
      </div>

      <Overlay animationData={animationData} isOpen={isLoading} />
    </form>
  )
}

UpdateBookPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="Update book | Reader's café">
      {page}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
