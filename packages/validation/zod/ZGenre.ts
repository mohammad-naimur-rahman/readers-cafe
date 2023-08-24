import { z } from 'zod'
import { genreEmunArray } from '../constants/genreEnumArray'

const CreateGenreZodSchema = z.object({
  genre: z.enum([...genreEmunArray] as [string, ...string[]], {
    required_error: 'Genre is required!',
  }),
  books: z.array(z.string()).optional(),
})

const UpdateGenreZodSchema = z.object({
  genre: z.enum([...genreEmunArray] as [string, ...string[]]).optional(),
  books: z.array(z.string()).optional(),
})

const GenreValidation = {
  CreateGenreZodSchema,
  UpdateGenreZodSchema,
}

export default GenreValidation
