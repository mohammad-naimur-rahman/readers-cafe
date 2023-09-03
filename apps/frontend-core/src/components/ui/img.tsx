import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
  src: {
    url: string
    dominantColor: string
  }
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
  const [isLoading, setisLoading] = useState(true)
  return (
    <Image
      src={src.url}
      alt={alt}
      sizes={sizes}
      width={width}
      height={height}
      style={{
        backgroundColor: isLoading ? src.dominantColor : 'transparent',
      }}
      className={twMerge(clsx('w-full h-auto block', className))}
      loading="lazy"
      onLoadingComplete={() => setisLoading(false)}
      {...rest}
    />
  )
}

interface LocalImgProps {
  src: any
  alt: string
  width?: number
  height?: number
  sizes?: string
  className?: string
}

export function LocalImg({
  src,
  alt,
  width = 500,
  height = 500,
  sizes = '40vw',
  className,
  ...rest
}: LocalImgProps) {
  return (
    <Image
      src={src}
      alt={alt}
      sizes={sizes}
      width={width}
      height={height}
      className={twMerge(clsx('w-full h-auto block', className))}
      placeholder="blur"
      loading="lazy"
      {...rest}
    />
  )
}
