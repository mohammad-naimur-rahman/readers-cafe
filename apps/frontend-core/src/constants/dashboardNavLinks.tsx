import {
  FileText,
  FolderKanban,
  Image,
  LayoutList,
  List,
  MessageCircle,
  PlusCircle,
  ScrollText,
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
      {
        label: 'Summary',
        href: '/dashboard/create/summary',
        icon: <LayoutList />,
      },
      {
        label: 'Blog',
        href: '/dashboard/create/blog',
        icon: <FileText />,
      },
      {
        label: 'Discussion',
        href: '/dashboard/create/discussion',
        icon: <ScrollText />,
      },
      {
        label: 'Short Content',
        href: '/dashboard/create/short-content',
        icon: <Image />,
      },
    ],
  },
  {
    hasChildren: true,
    label: 'All Contents',
    icon: <FolderKanban />,
    children: [
      {
        label: 'Summary',
        href: '/dashboard/contents/summary',
        icon: <LayoutList />,
      },
      {
        label: 'Blog',
        href: '/dashboard/contents/blog',
        icon: <FileText />,
      },
      {
        label: 'Discussion',
        href: '/dashboard/contents/discussion',
        icon: <ScrollText />,
      },
      {
        label: 'Short Content',
        href: '/dashboard/contents/short-content',
        icon: <Image />,
      },
    ],
  },
  {
    hasChildren: false,
    label: 'Reading List',
    icon: <List />,
    href: '/dashboard/reviews',
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
