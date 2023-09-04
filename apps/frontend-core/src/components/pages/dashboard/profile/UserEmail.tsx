import { Skeleton } from '@/components/ui/skeleton'

interface Props {
  email: string
  isLoading: boolean
}

export default function UserEmail({ email, isLoading }: Props) {
  if (isLoading) {
    return <Skeleton className="mb-5 w-64 h-5" />
  }
  return <p className="pb-5 text-lg text-secondary-foreground">{email}</p>
}
