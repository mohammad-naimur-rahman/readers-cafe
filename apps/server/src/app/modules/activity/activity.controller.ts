import httpStatus from 'http-status'
import { IActivity } from 'validation/types'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ActivityService } from './activity.service'

const createActivity = catchAsync(async (req, res) => {
  const createdActivity = await ActivityService.createActivity(req.body)
  sendResponse<IActivity>(res, {
    statusCode: httpStatus.CREATED,
    data: createdActivity,
    message: 'Activity created successfully!',
  })
})

const getALllActivities = catchAsync(async (req, res) => {
  const allActivities = await ActivityService.getAllActivities()
  sendResponse<IActivity[]>(res, {
    statusCode: httpStatus.OK,
    data: allActivities,
    message: 'All Activities retrieved successfully!',
  })
})

const getActivity = catchAsync(async (req, res) => {
  const Activity = await ActivityService.getActivity(req.params.id)
  sendResponse<IActivity>(res, {
    statusCode: httpStatus.OK,
    data: Activity,
    message: 'Activity retrieved successfully!',
  })
})

const updateActivity = catchAsync(async (req, res) => {
  const {
    body,
    params: { id },
  } = req
  const updatedActivity = await ActivityService.updateActivity(id, body)
  sendResponse<IActivity>(res, {
    statusCode: httpStatus.OK,
    data: updatedActivity,
    message: 'Activity updated successfully!',
  })
})

const deleteActivity = catchAsync(async (req, res) => {
  const deletedUser = await ActivityService.deleteActivity(req.params.id)
  sendResponse<IActivity>(res, {
    statusCode: httpStatus.NO_CONTENT,
    data: deletedUser,
    message: 'Activity deleted successfully!',
  })
})

export const ActivityController = {
  createActivity,
  getALllActivities,
  getActivity,
  updateActivity,
  deleteActivity,
}
