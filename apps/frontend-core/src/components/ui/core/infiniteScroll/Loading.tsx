import loadingAnimationData from '@/assets/lottie/loading.json'
import { lottieDefaultOptions } from '@/constants/lottieDeafultOptions'
import Lottie from 'react-lottie'

export default function Loading() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="h-40 w-40">
        <Lottie options={lottieDefaultOptions(loadingAnimationData)} />
      </div>
    </div>
  )
}
