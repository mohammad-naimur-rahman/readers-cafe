import { Router } from 'express'
import { BlogController } from './blog.controller'

const router = Router()

router
  .route('/')
  .get(BlogController.getALllBlogs)
  .post(BlogController.createBlog)

router
  .route('/:id')
  .get(BlogController.getBlog)
  .patch(BlogController.updateBlog)
  .delete(BlogController.deleteBlog)

export const blogRoutes = router
