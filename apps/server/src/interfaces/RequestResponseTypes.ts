import { Request } from 'express'
import { IUser } from 'validation/types'

export interface RequestWithUser extends Request {
  user?: IUser
}
