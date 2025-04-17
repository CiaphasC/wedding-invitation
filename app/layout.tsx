import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'wedding-invitation',
  description: 'Creado por Brad',
  generator: 'next',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
