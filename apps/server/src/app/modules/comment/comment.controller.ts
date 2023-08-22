import httpStatus from 'http-status'
import { IComment } from 'validation/types'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { CommentService } from './comment.service'

const createComment = catchAsync(async (req, res) => {
  const createdComment = await CommentService.createComment(req.body)
  sendResponse<IComment>(res, {
    statusCode: httpStatus.CREATED,
    data: createdComment,
    message: 'Comment created successfully!',
  })
})

const getALllComments = catchAsync(async (req, res) => {
  const allComments = await CommentService.getAllComments()
  sendResponse<IComment[]>(res, {
    statusCode: httpStatus.OK,
    data: allComments,
    message: 'All Comments retrieved successfully!',
  })
})

const getComment = catchAsync(async (req, res) => {
  const Comment = await CommentService.getComment(req.params.id)
  sendResponse<IComment>(res, {
    statusCode: httpStatus.OK,
    data: Comment,
    message: 'Comment retrieved successfully!',
  })
})

const updateComment = catchAsync(async (req, res) => {
  const {
    body,
    params: { id },
  } = req
  const updatedComment = await CommentService.updateComment(id, body)
  sendResponse<IComment>(res, {
    statusCode: httpStatus.OK,
    data: updatedComment,
    message: 'Comment updated successfully!',
  })
})

const deleteComment = catchAsync(async (req, res) => {
  const deltedComment = await CommentService.deleteComment(req.params.id)
  sendResponse<IComment>(res, {
    statusCode: httpStatus.NO_CONTENT,
    data: deltedComment,
    message: 'Comment deleted successfully!',
  })
})

export const CommentController = {
  createComment,
  getALllComments,
  getComment,
  updateComment,
  deleteComment,
}
