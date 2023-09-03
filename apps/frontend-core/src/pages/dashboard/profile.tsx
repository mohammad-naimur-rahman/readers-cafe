import DashboardLayout from '@/components/layouts/DashboardLayout'
import Bio from '@/components/pages/dashboard/profile/Bio'
import FullName from '@/components/pages/dashboard/profile/FullName'
import DashbaordErrorComponent from '@/components/ui/dashboard/common/DashbaordErrorComponent'

import Img from '@/components/ui/img'
import { Skeleton } from '@/components/ui/skeleton'

import { useCookieToken } from '@/hooks/useCookieToken'
import { useCookieUser } from '@/hooks/useCookieUser'
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from '@/redux/features/user/userApi'
import { IError } from '@/types/IError'

import { ReactElement, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { IUser } from 'validation/types'

export default function ProfilePage() {
  // Geting profile information
  const { _id: id } = useCookieUser()
  const { accessToken: token } = useCookieToken()
  const { isLoading, isError, error, data } = useGetProfileQuery({
    id,
    token,
  })
  const userData: IUser = data?.data

  // Updating profile
  const [
    updateBook,
    {
      isLoading: isUpdating,
      isSuccess: isUpdateSuccess,
      isError: isUpdateError,
      error: updateError,
    },
  ] = useUpdateProfileMutation()

  // Managing notifications on loading and error state
  useEffect(() => {
    if (isError) {
      toast.error((error as IError)?.data?.message)
    }

    if (isUpdateError) {
      toast.error((updateError as IError)?.data?.message)
    }

    if (isUpdateSuccess) {
      toast.success('Profile Updated Successfully')
    }
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
        <div className="w-36 h-36 rounded-full overflow-hidden mb-5 mt-10">
          {isLoading ? (
            <Skeleton className="w-full h-full" />
          ) : (
            <span>
              {userData?.profilePicture?.thumbnail ? (
                <Img
                  src={userData?.profilePicture?.thumbnail}
                  alt={userData?.fullName}
                />
              ) : (
                <Img src="/images/navbar/avatar.png" alt={userData?.fullName} />
              )}
            </span>
          )}
        </div>
        <FullName
          id={id}
          token={token}
          isLoading={isLoading}
          fullName={userData?.fullName}
          updateBook={updateBook}
        />
        {isLoading ? (
          <Skeleton className="mb-5 w-64 h-5" />
        ) : (
          <p className="pb-5 text-lg text-secondary-foreground">
            {userData?.email}
          </p>
        )}
        <Bio
          bio={userData?.bio}
          id={id}
          token={token}
          isLoading={isLoading}
          isUpdating={isUpdating}
          updateBook={updateBook}
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
