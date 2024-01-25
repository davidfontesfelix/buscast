/* eslint-disable camelcase */
import type { Metadata } from 'next'
import { Familjen_Grotesk } from 'next/font/google'
import './globals.css'

const familjenGrotesk = Familjen_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Buscast',
  description: 'Um player de podcast',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="">
      <body className={familjenGrotesk.className}>{children}</body>
    </html>
  )
}
