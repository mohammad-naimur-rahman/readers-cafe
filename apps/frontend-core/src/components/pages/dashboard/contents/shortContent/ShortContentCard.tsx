import noImage from '@/assets/images/no-image.png'
import ButtonExtended from '@/components/ui/ButtonExtended'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Img, { LocalImg } from '@/components/ui/img'
import { FileEdit, Trash2 } from 'lucide-react'
import { IShortContent } from 'validation/types'

interface Props {
  shortContent: IShortContent
}

export default function ShortContentCard({ shortContent }: Props) {
  return (
    <Card>
      <CardHeader className="p-3">
        <CardTitle className="text-lg">{shortContent.caption}</CardTitle>
      </CardHeader>
      <div>
        {shortContent?.image?.url ? (
          <Img
            src={shortContent?.image}
            alt={shortContent?.caption}
            className="aspect-short-content"
          />
        ) : (
          <LocalImg
            src={noImage}
            alt={shortContent?.caption}
            className="aspect-short-content"
          />
        )}
      </div>
      <p className="px-2 pt-3">
        <span className="font-semibold">Total comment: </span>
        {shortContent.comments.length}
      </p>
      <CardFooter className="flex justify-between flex-wrap gap-2 pb-2 pt-5 px-2">
        <ButtonExtended icon={<FileEdit />} type="submit">
          Edit Content
        </ButtonExtended>
        <ButtonExtended icon={<Trash2 />} variant="destructive" size="sm">
          Delete Content
        </ButtonExtended>
      </CardFooter>
    </Card>
  )
}
