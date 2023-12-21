import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.scss'
import {Providers} from "./providers";
import SideNavs from '@/components/UI/SideNavs';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OxenJS',
  description: 'Just another OxenJS site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}

          <SideNavs />
        </Providers>
      </body>
    </html>
  )
}
