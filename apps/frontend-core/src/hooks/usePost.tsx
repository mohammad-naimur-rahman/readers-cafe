import { API_URL } from '@/configs'
import axios from 'axios'
import { useReducer } from 'react'
import { IComment, IReview } from 'validation/types'
import { getIdAndToken } from '../utils/getIdAndToken'

type ReturnValue = [
  (payload: IReview | IComment) => Promise<void>,
  {
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
    error: any
    data: any
  },
]

// export const usePost = (path: string): ReturnValue => {
//   const { token } = getIdAndToken()
//   const [isLoading, setLoading] = useState(false)
//   const [isError, setisError] = useState(false)
//   const [error, seterror] = useState(null)
//   const [data, setdata] = useState(null)
//   const post = async (payload: IReview | IComment): Promise<void> => {
//     try {
//       setLoading(true)
//       const response = await axios.post(`${API_URL}/${path}`, payload, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       if (response?.status === 201) {
//         setLoading(false)
//         setdata(response.data)
//       }
//     } catch (err) {
//       setLoading(false)
//       setdata({})
//       seterror(error)
//       setisError(true)
//     }
//   }
//   return [post, { isLoading, isError, error, data }]
// }

type State = {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  error: any
  data: any
}

type Action =
  | { type: 'REQUEST' }
  | { type: 'SUCCESS'; payload: any }
  | { type: 'FAILURE'; error: any }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'REQUEST':
      return {
        isLoading: true,
        isSuccess: false,
        isError: false,
        error: null,
        data: null,
      }
    case 'SUCCESS':
      return {
        isLoading: false,
        isSuccess: true,
        isError: false,
        error: null,
        data: action.payload,
      }
    case 'FAILURE':
      return {
        isLoading: false,
        isSuccess: false,
        isError: true,
        error: action.error,
        data: null,
      }
    default:
      throw new Error()
  }
}

export const usePost = (path: string): ReturnValue => {
  const { token } = getIdAndToken()
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    isSuccess: false,
    isError: false,
    error: null,
    data: null,
  })

  const post = async (payload: IReview | IComment): Promise<void> => {
    dispatch({ type: 'REQUEST' })
    try {
      const response = await axios.post(`${API_URL}/${path}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response?.status === 201) {
        dispatch({ type: 'SUCCESS', payload: response.data })
      }
    } catch (err) {
      dispatch({ type: 'FAILURE', error: err })
    }
  }

  return [post, state]
}
