import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import { IAuthor } from 'validation/types'

interface Props {
  authors: IAuthor[]
  setauthors: Dispatch<SetStateAction<IAuthor[]>>
}

export default function SelectedAuthors({ authors, setauthors }: Props) {
  const removeAuthor = (id: string) => {
    const newAuthors = authors.filter(author => author._id !== id)
    setauthors(newAuthors)
  }
  return (
    <div className="flex flex-wrap gap-3">
      {authors?.map(author => (
        <div
          key={author._id}
          className="bg-primary pl-5 text-primary-foreground rounded-full flex items-center justify-center overflow-hidden"
        >
          <p>{author.fullName}</p>
          <Button type="button" onClick={() => removeAuthor(author._id)}>
            <X />
          </Button>
        </div>
      ))}
    </div>
  )
}
