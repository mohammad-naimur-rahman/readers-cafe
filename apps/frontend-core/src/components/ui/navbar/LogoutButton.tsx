import { env } from '@/configs/env'
import { initUserData } from '@/constants/initUserData'
import auth from '@/lib/firebaseConfig'
import { ICookieUser } from '@/types/ICookieUser'
import axios from 'axios'
import { deleteCookie, getCookie } from 'cookies-next'
import { signOut } from 'firebase/auth'
import { LogOut } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'react-hot-toast'
import { DropdownMenuItem, DropdownMenuSeparator } from '../dropdown-menu'
import SpinnerIcon from '../icons/SpinnerIcon'

interface Props {
  setuserData: Dispatch<SetStateAction<ICookieUser>>
}

export default function LogoutButton({ setuserData }: Props) {
  const [isLoading, setisLoading] = useState(false)

  const token = getCookie('accessToken')
  const handleLogout = async () => {
    try {
      setisLoading(true)
      await signOut(auth)
      await axios.patch(
        `${env.NEXT_PUBLIC_apiUrl}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      setisLoading(false)
      setuserData(initUserData)
      toast.success('Logged out successfully!')
      deleteCookie('userData')
      deleteCookie('accessToken')
      deleteCookie('refreshToken')
    } catch (err) {
      setisLoading(false)
      toast.error(err?.response?.data?.message)
    }
  }
  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
        {isLoading ? (
          <SpinnerIcon />
        ) : (
          <span className="flex items-center">
            <LogOut className="w-4 h-4 mr-2" /> Log out
          </span>
        )}
      </DropdownMenuItem>
    </>
  )
}
