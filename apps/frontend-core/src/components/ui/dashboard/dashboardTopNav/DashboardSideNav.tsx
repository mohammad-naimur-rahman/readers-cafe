import Link from 'next/link'
import Img from '../../img'
import { Separator } from '../../separator'
import NavLinks from './NavLinks'

export default function DashboardSideNav() {
  return (
    <nav className="flex flex-col px-5 py-3 border-right border-[1px] min-h-screen fixed top-0 left-0 w-[230px] bg-secondary gap-3">
      <Link href="/">
        <Img
          src="/logo/logo.png"
          alt="Reader's Cafe"
          className="w-full h-auto"
        />
      </Link>

      <Separator />

      <NavLinks />
    </nav>
  )
}