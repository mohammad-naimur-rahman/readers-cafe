import { ThemeProvider } from '@/lib/ThemeProvider'
import Head from 'next/head'
import { ReactNode } from 'react'

interface Props {
  title: string
  children: ReactNode
}

export default function EmptyLayout({ title, children }: Props) {
  return (
    <>
      <Head>
        <title>{title} | Reader&apos;s café</title>
      </Head>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <main className="container">{children}</main>
      </ThemeProvider>
    </>
  )
}
