import { Router } from 'express'
import { BlogValidation } from 'validation/zod/ZBlog'
import ENUM_USER_ROLE from '../../../enums/user'
import { authGuard } from '../../middlewares/authGuard'
import validateRequest from '../../middlewares/validateRequest'
import { BlogController } from './blog.controller'

const router = Router()

router
  .route('/')
  .get(BlogController.getALllBlogs)
  .post(
    validateRequest(BlogValidation.CreateBlogZodSchema),
    authGuard([ENUM_USER_ROLE.USER], true),
    BlogController.createBlog,
  )

router
  .route('/:id')
  .get(BlogController.getBlog)
  .patch(
    validateRequest(BlogValidation.UpdateBlogZodSchema),
    authGuard([ENUM_USER_ROLE.USER], true),
    BlogController.updateBlog,
  )
  .delete(
    validateRequest(BlogValidation.UpdateBlogZodSchema),
    authGuard([ENUM_USER_ROLE.USER], true),
    BlogController.deleteBlog,
  )

export const blogRoutes = router
