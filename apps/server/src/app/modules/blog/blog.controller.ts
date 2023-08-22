import httpStatus from 'http-status'
import { IBlog } from 'validation/types'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { BlogService } from './blog.service'

const createBlog = catchAsync(async (req, res) => {
  const createdBlog = await BlogService.createBlog(req.body)
  sendResponse<IBlog>(res, {
    statusCode: httpStatus.CREATED,
    data: createdBlog,
    message: 'Blog created successfully!',
  })
})

const getALllBlogs = catchAsync(async (req, res) => {
  const allBlogs = await BlogService.getAllBlogs()
  sendResponse<IBlog[]>(res, {
    statusCode: httpStatus.OK,
    data: allBlogs,
    message: 'All Blogs retrieved successfully!',
  })
})

const getBlog = catchAsync(async (req, res) => {
  const Blog = await BlogService.getBlog(req.params.id)
  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    data: Blog,
    message: 'Blog retrieved successfully!',
  })
})

const updateBlog = catchAsync(async (req, res) => {
  const {
    body,
    params: { id },
  } = req
  const updatedBlog = await BlogService.updateBlog(id, body)
  sendResponse<IBlog>(res, {
    statusCode: httpStatus.OK,
    data: updatedBlog,
    message: 'Blog updated successfully!',
  })
})

const deleteBlog = catchAsync(async (req, res) => {
  const deltedBlog = await BlogService.deleteBlog(req.params.id)
  sendResponse<IBlog>(res, {
    statusCode: httpStatus.NO_CONTENT,
    data: deltedBlog,
    message: 'Blog deleted successfully!',
  })
})

export const BlogController = {
  createBlog,
  getALllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
}
