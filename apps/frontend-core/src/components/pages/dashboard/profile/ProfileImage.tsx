import avatar from '@/assets/images/navbar/avatar.png'
import animationData from '@/assets/lottie/imageUploading.json'
import Img, { LocalImg } from '@/components/ui/img'
import Overlay from '@/components/ui/overlay'
import { Skeleton } from '@/components/ui/skeleton'
import { env } from '@/configs/env'
import { getColor } from '@/utils/auth/getColor'
import axios from 'axios'
import { Camera } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { IUser } from 'validation/types'

interface Props {
  id: string
  token: string
  isLoading: boolean
  userData: IUser
  updateBook: (payload) => void
}

export default function ProfileImage({
  id,
  token,
  isLoading,
  userData,
  updateBook,
}: Props) {
  const [isUploading, setisUploading] = useState(false)

  const uploadButtonRef = useRef(null)
  const handleUpdateProfilePicture = async e => {
    e.preventDefault()

    try {
      toast.success('Image uploading...')
      setisUploading(true)
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      formData.append('upload_preset', env.NEXT_PUBLIC_uploadPreset)
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_cloudName}/image/upload`,
        formData,
      )

      if (res.status === 200) {
        setisUploading(false)
        const colors = await getColor(res.data.secure_url)
        updateBook({
          payload: {
            profilePicture: {
              url: res.data.secure_url,
              dominantColor: colors,
            },
          },
          id,
          token,
        })
      } else {
        setisUploading(false)
      }
    } catch (err) {
      setisUploading(false)
      toast.error('Image upload failed!')
    }
  }

  return (
    <div className="w-36 h-36 rounded-full overflow-hidden mb-5 mt-10">
      {isLoading ? (
        <Skeleton className="w-full h-full" />
      ) : (
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
      )}
      <Overlay animationData={animationData} isOpen={isUploading} />
    </div>
  )
}
