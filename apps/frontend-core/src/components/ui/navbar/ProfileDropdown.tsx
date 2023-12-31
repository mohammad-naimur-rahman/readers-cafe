import avatar from '@/assets/images/navbar/avatar.png'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { initUserData } from '@/constants/initUserData'
import { ICookieUser } from '@/types/ICookieUser'
import { getCookie } from 'cookies-next'
import {
  FilePlus,
  FileText,
  Image,
  LayoutDashboard,
  LayoutList,
  LogIn,
  ScrollText,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { LocalImg } from '../img'
import LogoutButton from './LogoutButton'

export default function ProfileDropdown() {
  const user = getCookie('userData')
  const userParsed: ICookieUser = user ? JSON.parse(user) : {}

  const [userData, setuserData] = useState<ICookieUser>(
    userParsed || initUserData,
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>
              <LocalImg
                src={avatar}
                alt="User"
                sizes="10vw"
                width={100}
                height={100}
              />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {userData?._id ? (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {userData?.name}
                </p>
                <p className="text-sm leading-none text-muted-foreground">
                  {userData?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        ) : (
          <Link href="/login">
            <DropdownMenuItem className="cursor-pointer">
              <LogIn className="w-4 h-4 mr-2" /> Login
            </DropdownMenuItem>
          </Link>
        )}

        {userData?._id ? (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem className="flex flex-col gap-2 items-start focus:bg-background">
                <p className="flex items-center">
                  <FilePlus className="w-4 h-4 mr-2" />
                  Create
                </p>
                <ul className="flex flex-col w-full">
                  <li className="hover:bg-accent w-full py-1 px-3 block rounded-sm">
                    <Link
                      className="flex items-center gap-2"
                      href="/dashboard/create/summary"
                    >
                      <LayoutList className="w-4 h-4" /> Summary
                    </Link>
                  </li>
                  <li className="hover:bg-accent w-full py-1 px-3 block rounded-sm">
                    <Link
                      className="flex items-center gap-2"
                      href="/dashboard/create/blog"
                    >
                      <FileText className="w-4 h-4" />
                      Blog
                    </Link>
                  </li>
                  <li className="hover:bg-accent w-full py-1 px-3 block rounded-sm">
                    <Link
                      className="flex items-center gap-2"
                      href="/dashboard/create/discussion"
                    >
                      <ScrollText className="w-4 h-4" />
                      Discussion
                    </Link>
                  </li>
                  <li className="hover:bg-accent w-full py-1 px-3 block rounded-sm">
                    <Link
                      className="flex items-center gap-2"
                      href="/dashboard/create/short-content"
                    >
                      <Image className="w-4 h-4" />
                      Short Content
                    </Link>
                  </li>
                </ul>
              </DropdownMenuItem>
              <Link href="/dashboard/profile">
                <DropdownMenuItem className="cursor-pointer">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>

            <LogoutButton setuserData={setuserData} />
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
