import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

interface Props {
  className?: string
}

export default function TikTok({ className }: Props) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={twMerge(clsx('w-4 h-4', className))}
    >
      <path
        fill="currentColor"
        d="M22.4 5.6c-.4-1.2-1.2-2.1-2.4-2.4-1.1-.4-2.3-.3-3.4.1-2.5.8-4.5 2.9-5.3 5.4-.4 1.2-.3 2.4.1 3.6v.1c.4 1.2 1.2 2.2 2.4 2.6.4.1.7.1 1.1.1 1.5 0 3-.5 4.2-1.6 2.5-1.8 3.5-4.8 2.7-7.6zm-5.1 8.9c-.1-.4-.4-.8-.9-1.1-.7-.4-1.6-.2-2.1.5-.6.7-.7 1.6-.4 2.4.1.4.4.7.8.9 1.2.6 2.6.5 3.7-.2 1.2-.8 1.9-2.3 1.9-3.7 0-.5 0-1.1-.1-1.6-.3-1.7-1.4-2.7-3.1-2.8-1.1 0-2.4.5-3.3 1.2-.4.3-.7.8-.7 1.3v.1c-.1 1.7 1.1 3.2 2.8 3.5 1.7.3 3.2-1.1 3.5-2.8.1-.5.1-1.1.1-1.6 0-1.4-.4-2.9-1.3-4-.8-.8-1.9-1.3-3-1.3-.8 0-1.5.2-2.2.6-.6.3-1.1.7-1.4 1.2-.4.8-.4 1.8 0 2.7.4.8.9 1.3 1.7 1.7 1 .4 2.1.3 3-.3 0 0 .1 0 .1-.1 1.5-.7 1.8-2.4 1-3.5zm-2.8-4.7v.1c0 .1-.1.1-.1.1s-.1 0-.1-.1v-.1c0-.1.1-.1.1-.1s.1 0 .1.1z"
      />
    </svg>
  )
}
