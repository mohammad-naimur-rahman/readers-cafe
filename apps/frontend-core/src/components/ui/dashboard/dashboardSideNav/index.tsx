import logo from '@/assets/logo/logo.png'
import Link from 'next/link'
import { LocalImg } from '../../img'
import { Separator } from '../../separator'
import NavLinks from './NavLinks'

export default function DashboardSideNav() {
  return (
    <nav className="flex flex-col py-3 border-right border-[1px] min-h-screen fixed top-0 left-0 w-[230px] bg-secondary gap-3 h-screen">
      <Link href="/">
        <LocalImg
          src={logo}
          alt="Reader's Cafe"
          className="w-full h-auto px-5"
        />
      </Link>

      <Separator />

      <NavLinks />
    </nav>
  )
}
