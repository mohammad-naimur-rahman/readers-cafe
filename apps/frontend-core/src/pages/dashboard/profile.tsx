import DashboardLayout from '@/components/layouts/DashboardLayout'
import Bio from '@/components/pages/dashboard/profile/Bio'
import FullName from '@/components/pages/dashboard/profile/FullName'
import ProfileImage from '@/components/pages/dashboard/profile/ProfileImage'
import SocialMediaAccounts from '@/components/pages/dashboard/profile/SocialMediaAccounts'
import UserEmail from '@/components/pages/dashboard/profile/UserEmail'
import DashbaordErrorComponent from '@/components/ui/dashboard/common/DashbaordErrorComponent'
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/redux/features/user/userApi'
import { IError } from '@/types/IError'
import { getIdAndToken } from '@/utils/getIdAndToken'

import { ReactElement, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { IUser } from 'validation/types'

export default function ProfilePage() {
  // Geting user profile information
  const { id, token } = getIdAndToken()
  const { isLoading, isError, error, data } = useGetProfileQuery({
    id,
    token,
  })
  const userData: IUser = data?.data

  // Updating profile
  const [
    updateProfile,
    {
      isLoading: isUpdating,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateProfileMutation()

  // Managing notifications on loading and error state
  useEffect(() => {
    if (isError) toast.error((error as IError)?.data?.message)
    if (isUpdateError) toast.error((updateError as IError)?.data?.message)
    if (isUpdateSuccess) toast.success('Profile Updated Successfully')
  }, [isError, error, isUpdateError, isUpdateSuccess, updateError])

  if (isError) {
    return (
      <DashbaordErrorComponent
        errorMessage={(error as IError)?.data?.message}
      />
    )
  }

  return (
    <section>
      <div className="flex flex-col text-center justify-center items-center">
        <ProfileImage
          id={id}
          token={token}
          isLoading={isLoading}
          userData={userData}
          updateProfile={updateProfile}
        />
        <FullName
          id={id}
          token={token}
          isLoading={isLoading}
          fullName={userData?.fullName}
          updateProfile={updateProfile}
        />
        <UserEmail isLoading={isLoading} email={userData?.email} />

        <SocialMediaAccounts
          socialMediaAccounts={userData?.socialMediaAccounts}
          id={id}
          token={token}
          isLoading={isLoading}
          updateProfile={updateProfile}
        />
        <Bio
          bio={userData?.bio}
          id={id}
          token={token}
          isLoading={isLoading}
          isUpdating={isUpdating}
          updateProfile={updateProfile}
        />
      </div>
    </section>
  )
}

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout title="Profile | Reader's café">{page}</DashboardLayout>
  )
}
