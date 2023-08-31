import { ThemeProvider } from '@/lib/ThemeProvider'
import Head from 'next/head'
import { ReactNode } from 'react'
import Navbar from '../ui/navbar'

interface Props {
  title: string
  children: ReactNode
}

export default function RootLayout({ title, children }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar />
        <main className="h-min-body mt-16 container">{children}</main>
      </ThemeProvider>
    </>
  )
}
