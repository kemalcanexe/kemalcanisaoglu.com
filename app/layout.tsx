import type { Metadata } from 'next'
import ThemeProvider from '@/components/ThemeProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kemal Can İsaoğlu — Product & Operations',
  description:
    'Portfolio of Kemal Can İsaoğlu — Industrial Engineering & CS student at Koç University. Technical product management, operations, and structured problem-solving.',
  keywords: [
    'Kemal Can İsaoğlu',
    'Product Management',
    'Technical PM',
    'Product Operations',
    'Koç University',
    'ICRON Technologies',
    'Industrial Engineering',
  ],
  openGraph: {
    title: 'Kemal Can İsaoğlu — Product & Operations',
    description:
      'Technical product management, operations, and structured problem-solving.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
