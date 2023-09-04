import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

interface Props {
  className?: string
}

export default function YouTube({ className }: Props) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={twMerge(clsx('w-4 h-4', className))}
    >
      <path
        fill="currentColor"
        d="M23.2 7.6s-.2-1.6-.8-2.3c-.7-.7-1.4-.7-2.3-.8C18.5 4 12 4 12 4s-6.5 0-8.9.5c-.9.1-1.6.1-2.3.8C.2 6 0 7.6 0 7.6s-.2 1.6-.2 3.2v2.3s.1 1.6.2 3.2c.1.9.5 1.6 2.3 1.7 1.6.1 8.5.1 8.5.1s6.5 0 8.9-.5c.9-.1 1.6-.1 2.3-.8.2-.5.2-1.6.2-1.6s.1-1.6.1-3.2v-2.3s-.1-1.6-.1-3.2zm-16.2 10.6V6.2l8 5.9-8 5.9z"
      />
    </svg>
  )
}
