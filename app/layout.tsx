import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: '이브이타고 (EVTAGO) - BSS & 탄소 중립 모빌리티',
  description: '더 깨끗한 이동을 위한 우리의 여정. 이브이타고는 전기 이륜차와 배터리 스왑(BSS) 인프라를 통해 도시의 이동 방식을 바꾸는 친환경 모빌리티 기업입니다.',
  keywords: ['전기 이륜차', '배터리 스왑', 'BSS', '탄소 중립', '모빌리티', '이브이타고', 'EVTAGO'],
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
        url: '/evtg-favi.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: '이브이타고 (EVTAGO)',
    description: 'BSS & 탄소 중립 모빌리티 플랫폼',
    url: 'https://www.ev-tago.com',
    siteName: '이브이타고',
    locale: 'ko_KR',
    type: 'website',
  },
  verification: {
    google: 'WGOcsp3cRP71zrD1MJWyiY_hGSgwf68et852dzfGG7g', // 구글 서치 콘솔에서 발급받은 코드
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
