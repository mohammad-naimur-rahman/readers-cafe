import { ThemeProvider } from '@/lib/ThemeProvider'
import Head from 'next/head'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

interface Props {
  title: string
  children: ReactNode
}

export default function EmptyLayout({ title, children }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div>{children}</div>
        <Toaster position="top-center" reverseOrder={false} />
      </ThemeProvider>
    </>
  )
}
