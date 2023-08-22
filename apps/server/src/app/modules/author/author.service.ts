import { IAuthor } from 'validation/types'
import { Author } from './author.model'

const createAuthor = async (payload: IAuthor): Promise<IAuthor> => {
  const createdAuthor = await Author.create(payload)
  return createdAuthor
}

const getAllAuthors = async (): Promise<IAuthor[]> => {
  const authors = await Author.find()
  return authors
}

const getAuthor = async (id: string): Promise<IAuthor | null> => {
  const author = await Author.findById(id)
  return author
}

const updateAuthor = async (
  id: string,
  payload: Partial<IAuthor>,
): Promise<IAuthor | null> => {
  const updatedAuthor = await Author.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  })
  return updatedAuthor
}

const deleteAuthor = async (id: string): Promise<IAuthor | null> => {
  const deletedAuthor = await Author.findByIdAndDelete(id)
  return deletedAuthor
}

export const AuthorService = {
  createAuthor,
  getAllAuthors,
  updateAuthor,
  getAuthor,
  deleteAuthor,
}
