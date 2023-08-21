import { Types } from 'mongoose'

export interface IGenre {
  genre:
    | 'Fiction'
    | 'Non-Fiction'
    | 'Young Adult'
    | "Children's"
    | 'Horror'
    | 'Historical'
    | 'Romance'
    | 'Mystery Thriller'
    | 'Science Fiction'
    | 'Fantasy'
    | 'Adventure'
    | 'Comedy Horror'
    | 'Drama'
    | 'Poetry'
    | 'Satire'
    | 'Tragedy'
    | 'Religious Spiritual'
    | 'Cookbooks'
    | 'Travel'
    | 'Biography'
    | 'Others'
  books: Types.ObjectId[]
}
