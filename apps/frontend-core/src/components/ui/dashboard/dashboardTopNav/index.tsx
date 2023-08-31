import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../../button'
import ProfileDropdown from '../../navbar/ProfileDropdown'
import { ThemeSwitcher } from '../../navbar/ThemeSwitcher'
import DashboardSearchBox from './DashboardSearchBox'

export default function DashboardTopNav() {
  return (
    <nav className="flex items-center justify-between px-5 py-3 border-bottom border-[1px] h-16 fixed top-0 left-0 w-full gap-5">
      <div className="flex items-center justify-end gap-6 w-full">
        <DashboardSearchBox />
        <Link href="/">
          <Button className="rounded-full">
            <ArrowLeft className="w-5 h-5 mr-2" /> Go back home
          </Button>
        </Link>
        <ThemeSwitcher />
        <ProfileDropdown />
      </div>
    </nav>
  )
}
