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
import { getSongsByUserId } from '@/actions'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Listen to Music!',
}

export const revalidate = 0

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const userSongs = await getSongsByUserId()

  return (
    <html lang='en'>
      <body className={font.className}>
        <SupabaseProvider>
          <ToasterProvider />
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
