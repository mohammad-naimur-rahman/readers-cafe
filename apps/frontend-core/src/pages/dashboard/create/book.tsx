import imageUploadingAnimation from '@/assets/lottie/imageUploading.json'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import ManageAuthors from '@/components/pages/dashboard/create/book/ManageAuthors'
import ButtonExtended from '@/components/ui/ButtonExtended'
import Img from '@/components/ui/img'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Overlay from '@/components/ui/overlay'
import { Textarea } from '@/components/ui/textarea'
import { withAuth } from '@/utils/auth/withAuth'
import { imageUploader } from '@/utils/imageUploader'
import { PlusCircle } from 'lucide-react'
import { useRouter } from 'next/router'
import { ReactElement, useId, useState } from 'react'
import toast from 'react-hot-toast'
import { IBook } from 'validation/types'

export default function CreateBookPage() {
  const { query } = useRouter()
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

  return (
    <form className="max-w-4xl mx-auto space-y-5">
      <h2 className="text-3xl pt-3">Create Book</h2>

      {!query?.redirectedFrom ? (
        <p className="py-3 italic">
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
        <Label htmlFor={`${formId}-authors`}>Authors</Label>
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
      <div className="flex justify-end">
        <ButtonExtended icon={<PlusCircle />}>Create Book</ButtonExtended>
      </div>
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
