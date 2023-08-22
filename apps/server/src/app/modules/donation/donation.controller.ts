import httpStatus from 'http-status'
import { IDonation } from 'validation/types'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { DonationService } from './donation.service'

const createDonation = catchAsync(async (req, res) => {
  const createdDonation = await DonationService.createDonation(req.body)
  sendResponse<IDonation>(res, {
    statusCode: httpStatus.CREATED,
    data: createdDonation,
    message: 'Donation created successfully!',
  })
})

const getALllDonations = catchAsync(async (req, res) => {
  const allDonations = await DonationService.getAllDonations()
  sendResponse<IDonation[]>(res, {
    statusCode: httpStatus.OK,
    data: allDonations,
    message: 'All Donations retrieved successfully!',
  })
})

const getDonation = catchAsync(async (req, res) => {
  const Donation = await DonationService.getDonation(req.params.id)
  sendResponse<IDonation>(res, {
    statusCode: httpStatus.OK,
    data: Donation,
    message: 'Donation retrieved successfully!',
  })
})

const updateDonation = catchAsync(async (req, res) => {
  const {
    body,
    params: { id },
  } = req
  const updatedDonation = await DonationService.updateDonation(id, body)
  sendResponse<IDonation>(res, {
    statusCode: httpStatus.OK,
    data: updatedDonation,
    message: 'Donation updated successfully!',
  })
})

const deleteDonation = catchAsync(async (req, res) => {
  const deltedDonation = await DonationService.deleteDonation(req.params.id)
  sendResponse<IDonation>(res, {
    statusCode: httpStatus.NO_CONTENT,
    data: deltedDonation,
    message: 'Donation deleted successfully!',
  })
})

export const DonationController = {
  createDonation,
  getALllDonations,
  getDonation,
  updateDonation,
  deleteDonation,
}
