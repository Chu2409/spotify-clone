import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components'
import {
  ModalProvider,
  SupabaseProvider,
  ToasterProvider,
  UserProvider,
} from '@/providers'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Listen to Music!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <SupabaseProvider>
          <ToasterProvider />
          <UserProvider>
            <ModalProvider />
            <Sidebar>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
