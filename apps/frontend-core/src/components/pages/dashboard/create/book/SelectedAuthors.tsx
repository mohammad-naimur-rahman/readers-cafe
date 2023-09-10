import { IAuthor } from 'validation/types'

interface Props {
  authors: IAuthor[]
}

export default function SelectedAuthors({ authors }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {authors.map(author => (
        <p
          key={author._id}
          className="bg-primary px-4 py-2 text-white rounded-full"
        >
          {author.fullName}
        </p>
      ))}
    </div>
  )
}
