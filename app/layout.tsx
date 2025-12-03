import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'QUIZ - English',
  description: 'Generated project'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-br'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          all: 'unset',
          display: 'block',
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
        }}
      >
        {children}
      </body>
    </html>
  )
}
