import bookImage from '@/assets/images/book.png'
import ButtonExtended from '@/components/ui/ButtonExtended'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Img, { LocalImg } from '@/components/ui/img'
import { FileEdit } from 'lucide-react'
import Link from 'next/link'
import { IBook } from 'validation/types'

interface Props {
  book: IBook
}

export default function BookCard({ book }: Props) {
  return (
    <Card className="flex flex-col justify-between">
      <div>
        <CardHeader className="px-2 pt-2 pb-0">
          <CardTitle className="text-lg">{book.title}</CardTitle>
        </CardHeader>
        <CardDescription className="px-2">
          <div className="flex py-1.5">
            {book?.authors?.map((author, i) => (
              <p key={author._id}>
                {author?.fullName}
                {book.authors.length - 1 !== i && <span>,&nbsp;</span>}
              </p>
            ))}
          </div>
          <p className="font-semibold text-primary">{book.genre[0].genre}</p>
        </CardDescription>
        <CardContent className="p-3">
          <div className="h-[350px]">
            {book?.image?.url ? (
              <Img
                src={book?.image}
                alt={book.title}
                className="h-full w-auto mx-auto object-contain"
                sizes="20vw"
              />
            ) : (
              <LocalImg
                src={bookImage}
                alt={book.title}
                className="h-full w-auto mx-auto object-contain"
              />
            )}
          </div>
          {book?.description ? (
            <p className="pt-3">{book.description}</p>
          ) : (
            <p className="pt-3">
              <span className="font-semibold">Book Description: </span>Not
              Available
            </p>
          )}
          <p className="pt-3">
            <span className="font-semibold">Publication Year: </span>{' '}
            {book?.publicationYear || 'Unspecified'}
          </p>
          <p className="pt-3">
            <span className="font-semibold">Total Page: </span>{' '}
            {book.pageCount || 'Unspecified'}
          </p>
        </CardContent>
      </div>
      <CardFooter className="flex justify-end flex-wrap gap-2 pb-2 pt-5 px-2">
        <Link href={`/dashboard/update/book/${book._id}`}>
          <ButtonExtended icon={<FileEdit />}>Edit Book</ButtonExtended>
        </Link>
      </CardFooter>
    </Card>
  )
}
