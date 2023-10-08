import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { API_URL } from '@/configs'

export const useApiData = (urlpath: string, query?: string) => {
  const [data, setData] = useState(null)
  const [isFetching, setIsFetching] = useState(true)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true)
      setIsError(false)

      try {
        const url = `${API_URL}/${urlpath}?${query}`
        const response = await axios.get(url)
        setData(response.data)
      } catch (err) {
        setIsError(true)
        setError(err)
        toast.error(err.message)
      }

      setIsFetching(false)
    }

    fetchData()
  }, [urlpath, query])

  return {
    data,
    isFetching,
    isError,
    error,
  }
}
