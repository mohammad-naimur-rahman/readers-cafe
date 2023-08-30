import Link from 'next/link'
import Img from '../img'
import Navmenu from './Navmenu'
import ProfileDropdown from './ProfileDropdown'
import { ThemeSwitcher } from './ThemeSwitcher'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-5 py-3 border h-16 fixed top-0 left-0 w-full gap-5">
      <Link href="/">
        <Img
          src="/logo/logo.png"
          alt="Reader's cafe"
          className="w-48"
          sizes="10vw"
        />
      </Link>

      <Navmenu />

      <div className="flex items-center gap-5">
        <ThemeSwitcher />
        <ProfileDropdown />
      </div>
    </nav>
  )
}
