import { IGenre } from 'validation/types'
import { Genre } from './genre.model'

const createGenre = async (payload: IGenre): Promise<IGenre> => {
  const createdGenre = await Genre.create(payload)
  return createdGenre
}

const getAllGenres = async (): Promise<IGenre[]> => {
  const AllGenres = await Genre.find()
  return AllGenres
}

const getGenre = async (id: string): Promise<IGenre | null> => {
  const singleGenre = await Genre.findById(id)
  return singleGenre
}

const updateGenre = async (
  id: string,
  payload: Partial<IGenre>,
): Promise<IGenre | null> => {
  const updatedGenre = await Genre.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  })
  return updatedGenre
}

const deleteGenre = async (id: string): Promise<IGenre | null> => {
  const deletedGenre = await Genre.findByIdAndDelete(id)
  return deletedGenre
}

export const GenreService = {
  createGenre,
  getAllGenres,
  updateGenre,
  getGenre,
  deleteGenre,
}
