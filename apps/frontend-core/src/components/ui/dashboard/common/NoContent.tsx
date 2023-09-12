import empty from '@/assets/lottie/empty.json'
import { lottieDefaultOptions } from '@/constants/lottieDeafultOptions'
import Lottie from 'react-lottie'

interface Props {
  isLoading: boolean
  data: {
    data: []
  }
  content: string
}

export default function NoContent({ isLoading, data, content }: Props) {
  return (
    <div>
      {!isLoading && !data?.data?.length ? (
        <div className="w-full h-[80vh] flex flex-col items-center justify-center">
          <h3 className="italic text-3xl">No {content} Available!</h3>
          <div className="max-w-md">
            <Lottie options={lottieDefaultOptions(empty)} />
          </div>
        </div>
      ) : null}
    </div>
  )
}
