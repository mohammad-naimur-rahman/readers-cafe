import { Router } from 'express'
import ENUM_USER_ROLE from '../../../enums/user'
import { authGuard } from '../../middlewares/authGuard'
import { BlogController } from './blog.controller'

const router = Router()

router
  .route('/')
  .get(BlogController.getALllBlogs)
  .post(authGuard([ENUM_USER_ROLE.USER], true), BlogController.createBlog)

router
  .route('/:id')
  .get(BlogController.getBlog)
  .patch(BlogController.updateBlog)
  .delete(BlogController.deleteBlog)

export const blogRoutes = router
