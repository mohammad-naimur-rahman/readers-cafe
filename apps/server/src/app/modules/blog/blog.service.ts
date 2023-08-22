import { IBlog } from 'validation/types'
import { Blog } from './blog.model'

const createBlog = async (payload: IBlog): Promise<IBlog> => {
  const createdBlog = await Blog.create(payload)
  return createdBlog
}

const getAllBlogs = async (): Promise<IBlog[]> => {
  const AllBlogs = await Blog.find()
  return AllBlogs
}

const getBlog = async (id: string): Promise<IBlog | null> => {
  const singleBlog = await Blog.findById(id)
  return singleBlog
}

const updateBlog = async (
  id: string,
  payload: Partial<IBlog>,
): Promise<IBlog | null> => {
  const updatedBlog = await Blog.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  })
  return updatedBlog
}

const deleteBlog = async (id: string): Promise<IBlog | null> => {
  const deletedBlog = await Blog.findByIdAndDelete(id)
  return deletedBlog
}

export const BlogService = {
  createBlog,
  getAllBlogs,
  updateBlog,
  getBlog,
  deleteBlog,
}
