import { Router } from 'express'
import { DonationController } from './donation.controller'

const router = Router()

router
  .route('/')
  .get(DonationController.getALllDonations)
  .post(DonationController.createDonation)

router
  .route('/:id')
  .get(DonationController.getDonation)
  .patch(DonationController.updateDonation)
  .delete(DonationController.deleteDonation)

export const donationRoutes = router
