import { IImage } from 'validation/types'

export interface ICookieUser {
  _id: string
  email: string
  name: string
  image?: IImage
}
