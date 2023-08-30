import clsx from 'clsx'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'

interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  sizes?: string
  className?: string
}

export default function Img({
  src,
  alt,
  width = 500,
  height = 500,
  sizes = '40vw',
  className,
  ...rest
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      width={width}
      height={height}
      className={twMerge(clsx('w-full h-auto block', className))}
      {...rest}
    />
  )
}
