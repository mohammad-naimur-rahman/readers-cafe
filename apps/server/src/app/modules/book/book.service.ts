import { JwtPayload } from 'jsonwebtoken'
import { Types } from 'mongoose'
import { IBook } from 'validation/types'
import { Author } from '../author/author.model'
import { Genre } from '../genre/genre.model'
import { Book } from './book.model'

const createBook = async (payload: IBook, user: JwtPayload): Promise<IBook> => {
  const { authors, genre, ...payloadData } = payload
  let genreId
  const authorIds: string[] = []

  if (Types.ObjectId.isValid(genre.toString() as string)) {
    genreId = genre
  } else {
    const newGenreid = await Genre.create({ genre })
    genreId = newGenreid._id.toString()
  }

  const createAuthor = async (fullName: string): Promise<void> => {
    let authorId
    if (Types.ObjectId.isValid(fullName)) {
      authorId = fullName
    } else {
      const newAuthor = await Author.create({ fullName })
      authorId = newAuthor._id.toString()
    }
    authorIds.push(authorId)
  }

  const promises = authors.map(author => createAuthor(author.toString()))

  await Promise.all(promises)

  const createdBook = await Book.create({
    user: user.userId,
    genre: genreId,
    authors: authorIds,
    ...payloadData,
  })
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
