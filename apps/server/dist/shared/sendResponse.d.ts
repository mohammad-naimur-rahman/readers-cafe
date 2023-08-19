import { Response } from 'express'
type IApiReponse<T> = {
  statusCode: number
  success: boolean
  message?: string | null
  meta?: {
    page: number
    limit: number
    total: number
  }
  data?: T | null
}
declare const sendResponse: <T>(res: Response, data: IApiReponse<T>) => void
export default sendResponse
//# sourceMappingURL=sendResponse.d.ts.map
