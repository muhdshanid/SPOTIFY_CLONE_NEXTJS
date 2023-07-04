import Sidebar from '@/components/Sidebar'
import './globals.css'
import { Figtree } from 'next/font/google'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToastProvider from '@/providers/ToastProvider'
import { getSongsById } from '@/actions/actions'
import { Player } from '@/components/Player'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music',
}

export const revalidate = 0
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsById()
  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider/>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider/>
        <Sidebar userSongs={userSongs}>
        {children}
        </Sidebar>
        <Player/>
          </UserProvider>
        </SupabaseProvider>
        </body>
    </html>
  )
}
