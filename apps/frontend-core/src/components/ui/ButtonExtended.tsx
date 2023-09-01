import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { Button } from './button'
import SpinnerIcon from './icons/SpinnerIcon'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  icon?: ReactNode
  isLoading?: boolean
}

export default function ButtonExtended({
  children,
  icon,
  isLoading = false,
  ...rest
}: Props) {
  return (
    <Button
      {...rest}
      disabled={isLoading}
      className={twMerge(clsx('min-w-[150px]'))}
    >
      <div className="flex items-center gap-2">
        {isLoading ? (
          <SpinnerIcon />
        ) : (
          <span>{icon ? <span className="w-5 h-5">{icon}</span> : null}</span>
        )}
        {isLoading ? '' : <span>{children}</span>}
      </div>
    </Button>
  )
}
