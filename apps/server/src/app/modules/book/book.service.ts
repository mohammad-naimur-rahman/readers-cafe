import { IBook } from 'validation/types'
import { Book } from './book.model'

const createBook = async (payload: IBook): Promise<IBook> => {
  const createdBook = await Book.create(payload)
  return createdBook
}

const getAllBooks = async (): Promise<IBook[]> => {
  const AllBooks = await Book.find()
  return AllBooks
}

const getBook = async (id: string): Promise<IBook | null> => {
  const singleBook = await Book.findById(id)
  return singleBook
}

const updateBook = async (
  id: string,
  payload: Partial<IBook>,
): Promise<IBook | null> => {
  const updatedBook = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  })
  return updatedBook
}

const deleteBook = async (id: string): Promise<IBook | null> => {
  const deletedBook = await Book.findByIdAndDelete(id)
  return deletedBook
}

export const BookService = {
  createBook,
  getAllBooks,
  updateBook,
  getBook,
  deleteBook,
}
