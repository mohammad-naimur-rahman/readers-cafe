import { Types } from 'mongoose'
import { z } from 'zod'
import { genreEmunArray } from '../constants/genreEnumArray'

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
