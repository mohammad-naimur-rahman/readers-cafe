import Link from 'next/link'
import { Button } from '../button'

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

export default function Navmenu() {
  return (
    <ul className="flex items-center">
      {navigationMenu.map(({ href, label }) => (
        <li key={href}>
          <Link href={href}>
            <Button variant="ghost">{label}</Button>
          </Link>
        </li>
      ))}
    </ul>
  )
}
