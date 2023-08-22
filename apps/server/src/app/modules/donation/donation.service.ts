import { IDonation } from 'validation/types'
import { Donation } from './donation.model'

const createDonation = async (payload: IDonation): Promise<IDonation> => {
  const createdDonation = await Donation.create(payload)
  return createdDonation
}

const getAllDonations = async (): Promise<IDonation[]> => {
  const AllDonations = await Donation.find()
  return AllDonations
}

const getDonation = async (id: string): Promise<IDonation | null> => {
  const singleDonation = await Donation.findById(id)
  return singleDonation
}

const updateDonation = async (
  id: string,
  payload: Partial<IDonation>,
): Promise<IDonation | null> => {
  const updatedDonation = await Donation.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
      runValidators: true,
    },
  )
  return updatedDonation
}

const deleteDonation = async (id: string): Promise<IDonation | null> => {
  const deletedDonation = await Donation.findByIdAndDelete(id)
  return deletedDonation
}

export const DonationService = {
  createDonation,
  getAllDonations,
  updateDonation,
  getDonation,
  deleteDonation,
}
