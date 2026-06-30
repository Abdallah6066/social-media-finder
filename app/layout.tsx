import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'مدقق وسائل التواصل الاجتماعي',
  description: 'ابحث عن حسابات التواصل الاجتماعي المرتبطة بأي رقم هاتف',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  )
}
