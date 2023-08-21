import { Types } from 'mongoose'
import { z } from 'zod'

export const genreEmunArray: string[] = [
  'Fiction',
  'Non-Fiction',
  'Young Adult',
  "Children's",
  'Horror',
  'Historical',
  'Romance',
  'Mystery Thriller',
  'Science Fiction',
  'Fantasy',
  'Adventure',
  'Comedy Horror',
  'Drama',
  'Poetry',
  'Satire',
  'Tragedy',
  'Religious Spiritual',
  'Cookbooks',
  'Travel',
  'Biography',
  'Others',
]

const CreateGenreZodSchema = z.object({
  genre: z.enum([...genreEmunArray] as [string, ...string[]], {
    required_error: 'Genre is required!',
  }),
  books: z.array(z.instanceof(Types.ObjectId)).optional(),
})

const UpdateGenreZodSchema = z.object({
  genre: z.enum([...genreEmunArray] as [string, ...string[]]).optional(),
  books: z.array(z.instanceof(Types.ObjectId)).optional(),
})

const GenreValidation = {
  CreateGenreZodSchema,
  UpdateGenreZodSchema,
}

export default GenreValidation
