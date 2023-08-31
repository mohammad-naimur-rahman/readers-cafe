import {
  FolderKanban,
  MessageCircle,
  PlusCircle,
  Star,
  UserSquare,
} from 'lucide-react'

export const dashboardNavLinks = [
  {
    hasChildren: false,
    label: 'Profile',
    icon: <UserSquare />,
    href: '/dashboard/profile',
  },
  {
    hasChildren: true,
    label: 'Create Content',
    icon: <PlusCircle />,
    children: [
      { label: 'Summary', href: '/dashboard/create/summary' },
      { label: 'Blog', href: '/dashboard/create/blog' },
      { label: 'Discussion', href: '/dashboard/create/discussion' },
      { label: 'Short Content', href: '/dashboard/create/short-content' },
    ],
  },
  {
    hasChildren: true,
    label: 'All Contents',
    icon: <FolderKanban />,
    children: [
      { label: 'Summary', href: '/dashboard/contents/summary' },
      { label: 'Blog', href: '/dashboard/contents/blog' },
      { label: 'Discussion', href: '/dashboard/contents/discussion' },
      { label: 'Short Content', href: '/dashboard/contents/short-content' },
    ],
  },
  {
    hasChildren: false,
    label: 'Reviews',
    icon: <Star />,
    href: '/dashboard/reviews',
  },
  {
    hasChildren: false,
    label: 'Comments',
    icon: <MessageCircle />,
    href: '/dashboard/comments',
  },
]
