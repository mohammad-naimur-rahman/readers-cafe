import DashboardLayout from '@/components/layouts/DashboardLayout'
import Bio from '@/components/pages/dashboard/profile/Bio'
import DashbaordErrorComponent from '@/components/ui/dashboard/common/DashbaordErrorComponent'

import Img from '@/components/ui/img'
import { Skeleton } from '@/components/ui/skeleton'

import { useCookieToken } from '@/hooks/useCookieToken'
import { useCookieUser } from '@/hooks/useCookieUser'
import { useGetProfileQuery } from '@/redux/features/user/userApi'
import { IError } from '@/types/IError'

import { ReactElement, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { IUser } from 'validation/types'

export default function ProfilePage() {
  const { _id: id } = useCookieUser()
  const { accessToken: token } = useCookieToken()
  const { isLoading, isError, error, data } = useGetProfileQuery({
    id,
    token,
  })
  const userData: IUser = data?.data

  useEffect(() => {
    if (isError) {
      toast.error((error as IError)?.data?.message)
    }
  }, [isError, error])

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
        {isLoading ? (
          <Skeleton className="my-2 w-64 h-10" />
        ) : (
          <h2 className="py-2 text-4xl">{userData?.fullName}</h2>
        )}
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
          isDataLoading={isLoading}
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
