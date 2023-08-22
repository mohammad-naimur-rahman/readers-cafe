import { ISummary } from 'validation/types'
import { Summary } from './summary.model'

const createSummary = async (payload: ISummary): Promise<ISummary> => {
  const createdSummary = await Summary.create(payload)
  return createdSummary
}

const getAllSummaries = async (): Promise<ISummary[]> => {
  const AllSummaries = await Summary.find()
  return AllSummaries
}

const getSummary = async (id: string): Promise<ISummary | null> => {
  const singleSummary = await Summary.findById(id)
  return singleSummary
}

const updateSummary = async (
  id: string,
  payload: Partial<ISummary>,
): Promise<ISummary | null> => {
  const updatedSummary = await Summary.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  })
  return updatedSummary
}

const deleteSummary = async (id: string): Promise<ISummary | null> => {
  const deletedSummary = await Summary.findByIdAndDelete(id)
  return deletedSummary
}

export const SummaryService = {
  createSummary,
  getAllSummaries,
  updateSummary,
  getSummary,
  deleteSummary,
}
