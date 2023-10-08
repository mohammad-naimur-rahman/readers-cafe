import logo from '@/assets/logo/logo.png'
import Link from 'next/link'
import { LocalImg } from '../img'
import MobileNavmenu from './MobileNavmenu'
import Navmenu from './Navmenu'
import ProfileDropdown from './ProfileDropdown'
import { ThemeSwitcher } from './ThemeSwitcher'

const navigationMenu = [
  {
    href: '/summaries',
    label: 'Summaries',
  },
  {
    href: '/blogs',
    label: 'Blogs',
  },
  {
    href: '/discussions',
    label: 'Discussions',
  },
  {
    href: '/short-contents',
    label: 'Short Contents',
  },
]

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-5 py-3 shadow-lg h-16 fixed top-0 left-0 w-full gap-5 backdrop-blur-lg">
      <Link href="/">
        <LocalImg
          src={logo}
          alt="Reader's cafe"
          className="w-48"
          sizes="10vw"
        />
      </Link>
      <Navmenu navigationMenu={navigationMenu} />
      <div className="flex items-center gap-5">
        <ThemeSwitcher />
        <ProfileDropdown />
        <MobileNavmenu navigationMenu={navigationMenu} />
      </div>
    </nav>
  )
}
