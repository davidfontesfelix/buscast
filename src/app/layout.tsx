/* eslint-disable camelcase */
import type { Metadata } from 'next'
import { Familjen_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const familjenGrotesk = Familjen_Grotesk({
  subsets: ['latin'],
  variable: '--font-familjen-grotesk',
})
const JetBrainsMonos = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-monos',
})

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
      <body
        className={`${familjenGrotesk.variable} ${JetBrainsMonos.variable} font-familjenGrotesk`}
      >
        {children}
      </body>
    </html>
  )
}
