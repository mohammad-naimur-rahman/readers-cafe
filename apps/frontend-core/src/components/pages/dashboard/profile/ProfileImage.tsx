import avatar from '@/assets/images/navbar/avatar.png'
import animationData from '@/assets/lottie/imageUploading.json'
import Img, { LocalImg } from '@/components/ui/img'
import Overlay from '@/components/ui/overlay'
import { Skeleton } from '@/components/ui/skeleton'
import { imageUploader } from '@/utils/imageUploader'
import { Camera } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { IUser } from 'validation/types'

interface Props {
  id: string
  token: string
  isLoading: boolean
  userData: IUser
  updateProfile: (payload) => void
}

export default function ProfileImage({
  id,
  token,
  isLoading,
  userData,
  updateProfile,
}: Props) {
  const [isUploading, setisUploading] = useState(false)

  const uploadButtonRef = useRef(null)
  const handleUpdateProfilePicture = async e => {
    e.preventDefault()

    try {
      setisUploading(true)

      const imageInfo = await imageUploader(e)

      setisUploading(false)

      updateProfile({
        payload: {
          profilePicture: imageInfo,
        },
        id,
        token,
      })
    } catch (err) {
      setisUploading(false)
      toast.error('Image upload failed!')
    }
  }

  if (isLoading) {
    return (
      <Skeleton className="w-36 h-36 rounded-full overflow-hidden mb-5 mt-10" />
    )
  }

  return (
    <div className="w-36 h-36 rounded-full overflow-hidden mb-5 mt-10">
      <span className="relative w-full h-full inline-block group border rounded-full">
        {userData?.profilePicture?.url ? (
          <Img
            src={userData?.profilePicture}
            alt={userData?.fullName}
            className="w-full h-full aspect-square object-cover"
          />
        ) : (
          <LocalImg src={avatar} alt={userData?.fullName} />
        )}
        <button
          type="button"
          className="absolute bottom-0 left-0 w-full -mb-1 pb-3 pt-2 flex items-center justify-center bg-primary text-slate-100 gap-1.5 cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity"
          onClick={() => uploadButtonRef.current.click()}
        >
          <p className="text-sm">
            {userData?.profilePicture?.url ? 'Update' : 'Upload'}
          </p>
          <Camera className="w-4 h-4" />
        </button>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={uploadButtonRef}
          onChange={handleUpdateProfilePicture}
        />
      </span>
      <Overlay animationData={animationData} isOpen={isUploading} />
    </div>
  )
}
