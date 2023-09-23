import { API_URL } from '@/configs'
import axios from 'axios'
import toast from 'react-hot-toast'

export const fetcher = async (urlpath: string, query?: string) => {
  const url = query ? `${API_URL}/${urlpath}?${query}` : `${API_URL}/${urlpath}`

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    toast.error(error.message)
    return null
  }
}
