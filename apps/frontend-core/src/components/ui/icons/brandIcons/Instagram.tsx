import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

interface Props {
  className?: string
}

export default function Instagram({ className }: Props) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={twMerge(clsx('w-4 h-4', className))}
    >
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm6.67-14.43c-.07-.23-.2-.44-.37-.61s-.38-.3-.61-.37c-.26-.09-.53-.12-.81-.11-1.28.01-2.56.15-3.84.44-.2.04-.39.11-.57.21-.19.1-.36.23-.51.39s-.27.36-.37.57c-.18.43-.26.88-.25 1.34-.01.45.08.9.25 1.33.1.2.23.38.39.54s.35.29.54.39c.43.18.88.26 1.33.25.46.01.91-.07 1.33-.25.2-.1.38-.23.54-.39s.29-.35.39-.54c.18-.43.26-.88.25-1.33.01-.45-.07-.9-.25-1.33zM12 16c-2.92 0-5.29-2.37-5.29-5.29S9.08 5.41 12 5.41 17.29 7.78 17.29 10.7 14.92 16 12 16zm6.08-10.94c-.04-.13-.11-.26-.21-.37s-.24-.19-.37-.23c-.15-.06-.31-.08-.47-.08-1.05-.01-2.09.1-3.13.3-.21.03-.41.1-.61.18s-.36.2-.52.34c-.17.15-.32.32-.45.51s-.22.41-.29.63c-.11.31-.16.63-.15.95-.01.32.04.64.15.95.08.22.19.42.33.61s.31.32.51.45c.2.14.42.25.64.33.31.11.63.16.95.15.32.01.64-.04.95-.15.22-.08.42-.19.61-.33s.32-.31.45-.51c.13-.2.24-.42.32-.64.1-.31.15-.63.15-.95s-.05-.64-.15-.95zM12 14.59c-1.52 0-2.92-.59-3.99-1.66S6.35 10.52 6.35 9s.59-2.92 1.66-3.99S10.48 4.35 12 4.35s2.92.59 3.99 1.66S17.65 9 17.65 10s-.59 2.92-1.66 3.99S13.52 14.59 12 14.59z"
      />
    </svg>
  )
}
