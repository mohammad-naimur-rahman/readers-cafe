import { ILottie } from '@/types/ILottie'

export const lottieDefaultOptions = (animationData: any): ILottie => ({
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
})
