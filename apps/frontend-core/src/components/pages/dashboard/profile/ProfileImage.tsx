import Img from '@/components/ui/img'
import { Skeleton } from '@/components/ui/skeleton'
import { env } from '@/configs/env'
import axios from 'axios'
import { Camera } from 'lucide-react'
import { useRef } from 'react'
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
  const uploadButtonRef = useRef(null)
  const handleUpdateProfilePicture = async e => {
    e.preventDefault()
    try {
      toast.success('File uploading...')
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      formData.append('upload_preset', env.NEXT_PUBLIC_uploadPreset)
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_cloudName}/image/upload`,
        formData,
      )

      if (res.status === 200) {
        updateBook({
          payload: {
            profilePicture: {
              poster: res.data.secure_url,
            },
          },
          id,
          token,
        })
      }
    } catch (error) {
      toast.error('Image upload failed!')
      throw error
    }
  }
  return (
    <div className="w-36 h-36 rounded-full overflow-hidden mb-5 mt-10">
      {isLoading ? (
        <Skeleton className="w-full h-full" />
      ) : (
        <span className="relative w-full h-full inline-block group border rounded-full">
          {userData?.profilePicture?.poster ? (
            <Img
              src={userData?.profilePicture?.poster}
              alt={userData?.fullName}
              className="w-full h-full aspect-square object-cover"
            />
          ) : (
            <Img src="/images/navbar/avatar.png" alt={userData?.fullName} />
          )}
          <button
            type="button"
            className="absolute bottom-0 left-0 w-full -mb-1 pb-3 pt-2 flex items-center justify-center bg-primary text-slate-100 gap-1.5 cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity"
            onClick={() => uploadButtonRef.current.click()}
          >
            <p className="text-sm">
              {userData?.profilePicture?.poster ? 'Update' : 'Upload'}
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
    </div>
  )
}
