import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

interface Props {
  className?: string
}

export default function Facebook({ className }: Props) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={twMerge(clsx('w-4 h-4', className))}
    >
      <path
        fill="currentColor"
        d="M21.6 0H2.4A2.4 2.4 0 0 0 0 2.4v19.2A2.4 2.4 0 0 0 2.4 24h9.06v-9.29H8.82v-3.62h2.64V8.42c0-2.64 1.61-4.1 3.98-4.1a21.34 21.34 0 0 1 2.3.12v2.73h-1.6c-1.24 0-1.49.59-1.49 1.46v1.92h2.98L17.5 14h-2.13v9.29h6.24A2.4 2.4 0 0 0 24 21.6V2.4A2.4 2.4 0 0 0 21.6 0z"
      />
    </svg>
  )
}
