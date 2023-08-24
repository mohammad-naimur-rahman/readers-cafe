import { Router } from 'express'
import { BlogValidation } from 'validation/zod'
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
    authGuard(ENUM_USER_ROLE.USER),
    BlogController.createBlog,
  )

router
  .route('/:id')
  .get(BlogController.getBlog)
  .patch(
    validateRequest(BlogValidation.UpdateBlogZodSchema),
    authGuard(ENUM_USER_ROLE.USER),
    BlogController.updateBlog,
  )
  .delete(
    // Admin can delete anything if he wants
    authGuard(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.ADMIN),
    BlogController.deleteBlog,
  )

export const blogRoutes = router
