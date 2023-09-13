import { IGenericErrorMessage } from './error'

export type IGenericResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}

export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}

export type IFilterableFieldsWithPopulatedFields = {
  field: string
  populatedField: string
}[]

export type ILookupField = {
  from: string
  localField: string
  foreignField: string
  as: string
}

export type ILookupFields = ILookupField[]
