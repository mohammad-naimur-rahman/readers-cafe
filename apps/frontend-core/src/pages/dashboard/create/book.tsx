import imageUploadingAnimation from '@/assets/lottie/imageUploading.json'
import animationData from '@/assets/lottie/savingFile.json'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import ManageAuthors from '@/components/pages/dashboard/create/book/ManageAuthors'
import ButtonExtended from '@/components/ui/ButtonExtended'
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
import { useCreateBookMutation } from '@/redux/features/book/bookApi'
import { useGetGenresQuery } from '@/redux/features/genre/genreApi'
import { IError } from '@/types/IError'
import { withAuth } from '@/utils/auth/withAuth'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { imageUploader } from '@/utils/imageUploader'
import { FilePlus2 } from 'lucide-react'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useId, useState } from 'react'
import toast from 'react-hot-toast'
import { IBook } from 'validation/types'

export default function CreateBookPage() {
  const { token } = getIdAndToken()
  const { query, push } = useRouter()
  const formId = useId()

  const [book, setbook] = useState<IBook>({
    title: '',
    description: '',
    authors: [],
    image: { url: '', dominantColor: '' },
    genre: null,
    pageCount: 0,
    publicationYear: '',
    summaries: [],
  })

  const [isImageUploading, setisImageUploading] = useState(false)

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

  const { data } = useGetGenresQuery(undefined)
  const allGenres = data?.data

  const [createBook, { isLoading, isError, isSuccess, error, data: bookData }] =
    useCreateBookMutation()

  const handleCreateBook = e => {
    e.preventDefault()

    if (!book.title || !book.authors.length || !book.genre) {
      toast.error('Please fill out the required fields!')
      return
    }

    createBook({ payload: book, token })
  }

  useEffect(() => {
    if (isError) toast.error((error as IError)?.data?.message)
    if (isSuccess) {
      toast.success('Book created successfully!')
      if (query.redirectedFrom) {
        push(`/dashboard/create/summary?bookId=${bookData?.data?._id}`)
      } else {
        push('/')
      }
    }
    if (isLoading) toast.success('Book creating!')
  }, [isSuccess, isError, isLoading, error])

  return (
    <form className="max-w-4xl mx-auto space-y-5" onSubmit={handleCreateBook}>
      <h2 className="text-3xl pt-3">Create Book</h2>

      {!query?.redirectedFrom ? (
        <p className="italic">
          Create book as volunteer work so that other users can find this book
          later for writing summary
        </p>
      ) : null}

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
        <ManageAuthors book={book} setbook={setbook} />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${formId}-image`}>Image</Label>
        {book.image.url ? (
          <Img src={book.image} alt="Cover Image" />
        ) : (
          <Input
            type="file"
            accept="image/*"
            id={`${formId}-image`}
            onChange={handleImage}
          />
        )}
      </div>

      <div className="space-y-2 flex flex-col">
        <Label htmlFor={`${formId}-genre`}>Genre *</Label>
        <Select
          onValueChange={value =>
            setbook({ ...book, genre: value as unknown as IBook['genre'] })
          }
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
        <ButtonExtended icon={<FilePlus2 />}>Create Book</ButtonExtended>
      </div>

      <Overlay animationData={animationData} isOpen={isLoading} />
      <Overlay
        animationData={imageUploadingAnimation}
        isOpen={isImageUploading}
      />
    </form>
  )
}

CreateBookPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="Create Book | Reader's café">
      {page}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
