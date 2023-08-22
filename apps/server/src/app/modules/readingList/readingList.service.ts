import { IReadingList } from 'validation/types'
import { ReadingList } from './readingList.model'

const createReadingList = async (
  payload: IReadingList,
): Promise<IReadingList> => {
  const createdReadingList = await ReadingList.create(payload)
  return createdReadingList
}

const getAllReadingLists = async (): Promise<IReadingList[]> => {
  const AllReadingLists = await ReadingList.find()
  return AllReadingLists
}

const getReadingList = async (id: string): Promise<IReadingList | null> => {
  const singleReadingList = await ReadingList.findById(id)
  return singleReadingList
}

const updateReadingList = async (
  id: string,
  payload: Partial<IReadingList>,
): Promise<IReadingList | null> => {
  const updatedReadingList = await ReadingList.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
      runValidators: true,
    },
  )
  return updatedReadingList
}

const deleteReadingList = async (id: string): Promise<IReadingList | null> => {
  const deletedReadingList = await ReadingList.findByIdAndDelete(id)
  return deletedReadingList
}

export const ReadingListService = {
  createReadingList,
  getAllReadingLists,
  updateReadingList,
  getReadingList,
  deleteReadingList,
}
