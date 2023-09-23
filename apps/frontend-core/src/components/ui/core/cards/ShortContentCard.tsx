import noImage from '@/assets/images/no-image.png'
import ButtonExtended from '@/components/ui/ButtonExtended'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Img, { LocalImg } from '@/components/ui/img'
import { cn } from '@/lib/utils'
import { View } from 'lucide-react'
import { IShortContent } from 'validation/types'

interface Props {
  shortContent: IShortContent
  fixedSize?: boolean
}

export default function ShortContentCard({ shortContent, fixedSize }: Props) {
  return (
    <Card
      className={cn('w-96 bg-secondary', {
        'flex-shrink-0 w-96': fixedSize,
      })}
    >
      <CardHeader className="p-3">
        <CardTitle className="text-lg">{shortContent.caption}</CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="h-[350px]">
          {shortContent?.image?.url ? (
            <Img
              src={shortContent?.image}
              alt={shortContent?.caption}
              className="h-full w-auto mx-auto object-contain"
            />
          ) : (
            <LocalImg
              src={noImage}
              alt={shortContent?.caption}
              className="h-full w-auto mx-auto object-contain"
            />
          )}
        </div>
        <p className="pt-3">
          <span className="font-semibold">Total comment: </span>
          {shortContent.comments.length}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end flex-wrap gap-2 pb-2 pt-5 px-2">
        <ButtonExtended icon={<View />}>View Content</ButtonExtended>
      </CardFooter>
    </Card>
  )
}
