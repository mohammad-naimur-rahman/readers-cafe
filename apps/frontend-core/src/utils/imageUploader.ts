import { env } from '@/configs/env'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { IImage } from 'validation/types'
import { getDominantColor } from './getDominantColor'

export const imageUploader = async e => {
  e.preventDefault()
  let imageInfo: IImage = {
    url: '',
    dominantColor: '',
  }

  try {
    toast.success('Image uploading...')
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    formData.append('upload_preset', env.NEXT_PUBLIC_uploadPreset)
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_cloudName}/image/upload`,
      formData,
    )

    if (res.status === 200) {
      const colors: string = (await getDominantColor(
        res.data.secure_url,
      )) as string
      imageInfo = {
        url: res.data.secure_url,
        dominantColor: colors,
      }
    } else {
      toast.error('Image upload failed!')
    }
  } catch (err) {
    toast.error('Image upload failed!')
  }

  return imageInfo
}
