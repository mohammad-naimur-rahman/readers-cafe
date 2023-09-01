export interface IError {
  status: number
  data: {
    success: boolean
    message: string
  }
}
