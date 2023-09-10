import { IAuthor } from 'validation/types'
import { authorSearchableFields } from './author.constants'
import { IAuthorFilters } from './author.interface'
import { Author } from './author.model'

const createAuthor = async (payload: IAuthor): Promise<IAuthor> => {
  const createdAuthor = await Author.create(payload)
  return createdAuthor
}

const getAllAuthors = async (filters: IAuthorFilters): Promise<IAuthor[]> => {
  const { search, ...filtersData } = filters

  const andConditions = []

  if (search) {
    andConditions.push({
      $or: authorSearchableFields.map(field => ({
        [field]: {
          $regex: search,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const allAuthors = await Author.find(whereConditions)
  return allAuthors
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
