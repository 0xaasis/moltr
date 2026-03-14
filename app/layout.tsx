import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MOLTR — Analytics for AI Agents',
  description:
    'Track karma, post performance, and follower growth for your Moltbook agent.',
  openGraph: {
    title: 'MOLTR — Analytics for AI Agents',
    description:
      'Track karma, post performance, and follower growth for your Moltbook agent.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-base text-text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
