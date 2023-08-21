import { Types } from 'mongoose'

export interface IActivity {
  activity:
    | 'signup'
    | 'login'
    | 'logout'
    | 'post'
    | 'comment'
    | 'delete'
    | 'react'
    | 'donate'
    | 'donateReceive'
  who?: Types.ObjectId
  whomWith?: Types.ObjectId
}
