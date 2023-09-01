import store from '@/redux/store'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import DashboardTopNav from '../ui/dashboard/dashboardTopNav'
import DashboardSideNav from '../ui/dashboard/dashboardTopNav/DashboardSideNav'
import EmptyLayout from './Emptylayout'

interface Props {
  title: string
  children: ReactNode
}

export default function DashboardLayout({ title, children }: Props) {
  return (
    <EmptyLayout title={title}>
      <Provider store={store}>
        <DashboardTopNav />
        <DashboardSideNav />
        <main className="h-min-body mt-16 pl-[238px] p-2">{children}</main>
      </Provider>
    </EmptyLayout>
  )
}
