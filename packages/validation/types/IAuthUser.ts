import { IUser } from './IUser'
export interface IAuthUser {
  user: IUser
  token: {
    accessToken: string
    refreshToken: string
  }
}
