import { IActivity } from 'validation/types'
import { Activity } from './activity.model'

const createActivity = async (payload: IActivity): Promise<IActivity> => {
  const createdActivity = await Activity.create(payload)
  return createdActivity
}

const getAllActivities = async (): Promise<IActivity[]> => {
  const activities = await Activity.find()
  return activities
}

const getActivity = async (id: string): Promise<IActivity | null> => {
  const activity = await Activity.findById(id)
  return activity
}

const updateActivity = async (
  id: string,
  payload: IActivity,
): Promise<IActivity | null> => {
  const updatedActivity = await Activity.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
      runValidators: true,
    },
  )
  return updatedActivity
}

const deleteActivity = async (id: string): Promise<IActivity | null> => {
  const activity = await Activity.findByIdAndDelete(id)
  return activity
}

export const ActivityService = {
  createActivity,
  getAllActivities,
  updateActivity,
  getActivity,
  deleteActivity,
}
