import imageUploadingAnimation from '@/assets/lottie/imageUploading.json'
import animationData from '@/assets/lottie/savingFile.json'
import DashboardLayout from '@/components/layouts/DashboardLayout'
import ButtonExtended from '@/components/ui/ButtonExtended'
import { Button } from '@/components/ui/button'
import Img from '@/components/ui/img'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Overlay from '@/components/ui/overlay'
import { initShortContent } from '@/constants/dashboard/initValues'
import { initImage } from '@/constants/initImage'
import { useCreateShortContentMutation } from '@/redux/features/shortContent/shortContentApi'
import { IError } from '@/types/IError'
import { withAuth } from '@/utils/auth/withAuth'
import { getIdAndToken } from '@/utils/getIdAndToken'
import { imageUploader } from '@/utils/imageUploader'
import { FilePlus2, X } from 'lucide-react'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useId, useState } from 'react'
import { toast } from 'react-hot-toast'
import { IShortContent } from 'validation/types'

export default function CreateShortContentPage() {
  const { push } = useRouter()
  const { token } = getIdAndToken()
  const formId = useId()
  const [createShortContent, { isLoading, isError, error, isSuccess }] =
    useCreateShortContentMutation()

  const [isImageUploading, setisImageUploading] = useState(false)

  const [shortContent, setshortContent] = useState<IShortContent>(
    initShortContent(),
  )

  const onChangeCaption = e => {
    setshortContent({ ...shortContent, caption: e.target.value })
  }

  const handleImage = async e => {
    setisImageUploading(true)
    const result = await imageUploader(e)
    if (result) {
      setisImageUploading(false)
      setshortContent({ ...shortContent, image: result })
    } else {
      setisImageUploading(false)
      toast.error('Image upload failed!')
    }
  }

  const handleCreateShortContent = e => {
    e.preventDefault()
    if (!shortContent.caption) {
      toast.error('Please fill out the required fields!')
      return
    }

    createShortContent({ payload: shortContent, token })
  }

  useEffect(() => {
    if (isError) toast.error((error as IError)?.data?.message)

    if (isSuccess) {
      push('/dashboard/contents/short-content')
      toast.success('Short Content created successfully!')
    }
  }, [isSuccess, isError, error, push])

  return (
    <form
      className="max-w-4xl mx-auto space-y-5"
      onSubmit={handleCreateShortContent}
    >
      <h2 className="text-3xl pt-3">Create Short Content</h2>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-title`}>Caption / Title *</Label>
        <Input
          id={`${formId}-title`}
          placeholder="Write down the Caption / Title"
          onChange={onChangeCaption}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${formId}-image`} className="block">
          Image
        </Label>
        {shortContent.image.url ? (
          <div className="inline-flex items-center justify-center gap-5 p-5">
            <Img
              src={shortContent.image}
              alt="Cover Image"
              className="max-w-sm"
            />
            <Button
              variant="ghost"
              type="button"
              onClick={() =>
                setshortContent({ ...shortContent, image: initImage })
              }
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
          />
        )}
      </div>
      <div className="flex justify-end">
        <ButtonExtended type="submit" icon={<FilePlus2 />}>
          Create Short Content
        </ButtonExtended>
      </div>
      <Overlay animationData={animationData} isOpen={isLoading} />
      <Overlay
        animationData={imageUploadingAnimation}
        isOpen={isImageUploading}
      />
    </form>
  )
}

CreateShortContentPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="Create Short Content | Reader's café">
      {page}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async () => {
  return {
    props: {},
  }
})
