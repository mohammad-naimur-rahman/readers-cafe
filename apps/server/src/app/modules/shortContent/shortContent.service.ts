import { IShortContent } from 'validation/types'
import { ShortContent } from './shortContent.model'

const createShortContent = async (
  payload: IShortContent,
): Promise<IShortContent> => {
  const createdShortContent = await ShortContent.create(payload)
  return createdShortContent
}

const getAllShortContents = async (): Promise<IShortContent[]> => {
  const AllShortContents = await ShortContent.find()
  return AllShortContents
}

const getShortContent = async (id: string): Promise<IShortContent | null> => {
  const singleShortContent = await ShortContent.findById(id)
  return singleShortContent
}

const updateShortContent = async (
  id: string,
  payload: Partial<IShortContent>,
): Promise<IShortContent | null> => {
  const updatedShortContent = await ShortContent.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
      runValidators: true,
    },
  )
  return updatedShortContent
}

const deleteShortContent = async (
  id: string,
): Promise<IShortContent | null> => {
  const deletedShortContent = await ShortContent.findByIdAndDelete(id)
  return deletedShortContent
}

export const ShortContentService = {
  createShortContent,
  getAllShortContents,
  updateShortContent,
  getShortContent,
  deleteShortContent,
}
