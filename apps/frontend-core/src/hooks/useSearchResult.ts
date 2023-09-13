import { API_URL } from '@/configs'
import { IError } from '@/types/IError'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDebounce } from 'use-debounce'
import { useCookieToken } from './useCookieToken'

export const useSearchResult = <T>(
  searchData: string,
  needAuth: boolean = false,
  debounceTime: number = 500,
) => {
  const { accessToken } = useCookieToken()
  const [searchValue, setsearchValue] = useState('')
  const [debouncedValue] = useDebounce(searchValue, debounceTime)
  const [searchedData, setsearchedData] = useState<T[]>([])
  const [searching, setsearching] = useState(false)
  const [typing, settyping] = useState(false)
  const [stateToChange, setStateToChange] = useState(null)

  const handleInput = e => {
    setsearchValue(e.target.value)
    settyping(true)
    if (stateToChange) {
      clearTimeout(stateToChange)
    }
    setStateToChange(
      setTimeout(() => {
        settyping(false)
      }, 500),
    )
  }

  useEffect(() => {
    ;(async () => {
      try {
        if (debouncedValue) {
          setsearching(true)
          const result = await axios.get(
            `${API_URL}/${searchData}?search=${debouncedValue}`,
            {
              method: 'GET',
              headers: {
                Authorization: needAuth ? `Bearer ${accessToken}` : null,
              },
            },
          )
          setsearching(false)
          setsearchedData(result?.data?.data)
        } else {
          setsearching(false)
          setsearchedData([])
        }
      } catch (error) {
        toast.error(
          (error as IError)?.data?.message || (error as Error).message,
        )
      }
    })()
  }, [debouncedValue, searchData, accessToken, needAuth])

  return {
    isSearching: (searching && searchValue) || (typing && searchValue),
    handleInput,
    searchedData,
    searchValue,
    setsearchValue,
    debouncedValue,
  }
}
