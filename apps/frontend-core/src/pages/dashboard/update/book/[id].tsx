import imageUploadingAnimation from '@/assets/lottie/imageUploading.json'
import animationData from '@/assets/lottie/updating3.json'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import ManageUpdatedAuthors from '@/components/pages/dashboard/update/book/ManageUpdatedAuthors'
import ButtonExtended from '@/components/ui/ButtonExtended'
import { Button } from '@/components/ui/button'
import Img from '@/components/ui/img'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Overlay from '@/components/ui/overlay'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { initBookValues } from '@/constants/dashboard/initValues'
import { initImage } from '@/constants/initImage'
import {
  useGetBookQuery,
  useUpdateBookMutation,
} from '@/redux/features/book/bookApi'
import { useGetGenresQuery } from '@/redux/features/genre/genreApi'
import { IError } from '@/types/IError'
import { withAuth } from '@/utils/auth/withAuth'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { imageUploader } from '@/utils/imageUploader'
import { FileEdit, X } from 'lucide-react'
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

  const { data: genreData } = useGetGenresQuery(undefined)
  const allGenres = genreData?.data
  const [updateBook, { isLoading, isError, error, isSuccess }] =
    useUpdateBookMutation()

  const [isImageUploading, setisImageUploading] = useState(false)
  const [book, setbook] = useState<IBook>(initBookValues)
  const [selectedAuthors, setselectedAuthors] = useState<IAuthor[]>(
    book?.authors as IAuthor[],
  )
  const [selectedGenre, setselectedGenre] = useState(null)

  useEffect(() => {
    if (data?.data) {
      setbook(data.data)
      setselectedAuthors(data.data.authors)
      setselectedGenre(data.data.genre._id)
    }
  }, [data])

  const handleImage = async e => {
    setisImageUploading(true)
    const result = await imageUploader(e)
    if (result) {
      setisImageUploading(false)
      setbook({ ...book, image: result })
    } else {
      setisImageUploading(false)
      toast.error('Image upload failed!')
    }
  }

  const handleUpdateBook = e => {
    e.preventDefault()

    if (!book.title || !selectedAuthors.length || !book.genre) {
      toast.error('Please fill out the required fields!')
      return
    }

    const authorIds = selectedAuthors.map(author => author._id)
    const { authors, genre, ...restOfTheBook } = book

    const payload = {
      ...restOfTheBook,
      authors: authorIds,
      genre: selectedGenre,
    }

    updateBook({
      payload,
      token,
      id: query.id,
    })
  }

  useEffect(() => {
    if (isError) toast.error((error as IError)?.data?.message)
    if (isSuccess) {
      toast.success('Book updated successfully!')
      push('/dashboard/contents/book')
    }
  }, [error, isError, isSuccess, push])

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

      <div className="space-y-2">
        <Label htmlFor={`${formId}-image`} className="block">
          Image
        </Label>
        {book?.image?.url ? (
          <div className="inline-flex items-center justify-center gap-5 p-5">
            <Img src={book.image} alt="Cover Image" className="max-w-sm" />
            <Button
              variant="ghost"
              type="button"
              onClick={() => setbook({ ...book, image: initImage })}
            >
              <X />
            </Button>
          </div>
        ) : (
          <Input
            type="file"
            accept="image/*"
            id={`${formId}-image`}
            onChange={handleImage}
            className="max-w-xs"
          />
        )}
      </div>

      <div className="space-y-2 flex flex-col">
        <Label htmlFor={`${formId}-genre`}>Genre *</Label>
        <Select
          value={selectedGenre}
          onValueChange={value => setselectedGenre(value)}
        >
          <SelectTrigger className="max-w-xs">
            <SelectValue placeholder="Select Genre" />
          </SelectTrigger>
          <SelectContent id={`${formId}-genre`}>
            <SelectGroup className="overflow-auto max-h-[50dvh]">
              <SelectLabel>Select Genre</SelectLabel>
              {allGenres?.map(genre => (
                <SelectItem key={genre._id} value={genre._id}>
                  {genre.genre}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 flex flex-col max-w-xs">
        <Label htmlFor={`${formId}-pageCount`}>Total Page</Label>
        <Input
          id={`${formId}-pageCount`}
          type="number"
          inputMode="numeric"
          placeholder="Page Count"
          value={book.pageCount}
          onChange={e => setbook({ ...book, pageCount: +e.target.value })}
          required
        />
      </div>

      <div className="space-y-2 flex flex-col max-w-xs">
        <Label htmlFor={`${formId}-publicationYear`}>Publication Year</Label>
        <Input
          id={`${formId}-publicationYear`}
          type="number"
          inputMode="numeric"
          placeholder="Publication Year"
          value={book.publicationYear}
          onChange={e => setbook({ ...book, publicationYear: e.target.value })}
        />
      </div>

      <div className="flex justify-end">
        <ButtonExtended icon={<FileEdit />}>Update Book</ButtonExtended>
      </div>

      <Overlay animationData={animationData} isOpen={isLoading} />
      <Overlay
        animationData={imageUploadingAnimation}
        isOpen={isImageUploading}
      />
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
