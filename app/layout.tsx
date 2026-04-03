import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: '이브이타고',
  description: '탄소 중립을 향한 친환경 모빌리티 솔루션. 전기 오토바이와 배터리 스왑 스테이션으로 지속 가능한 미래를 만들어갑니다.',
  generator: 'v0.app',
  keywords: ['전기이륜차', '배터리스왑', 'ESG', '탄소중립', '친환경', '전기오토바이'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x321.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon-96x9611.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/evtg_favi.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
