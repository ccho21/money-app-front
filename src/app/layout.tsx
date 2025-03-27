// 📄 경로: src/app/layout.tsx
'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import useAuthRedirectSync from '@features/auth/hooks/useAuthRedirectSync';
import AuthGuard from '@features/auth/components/AuthGuard';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loading = useAuthRedirectSync();

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900 dark:bg-black dark:text-white`}
      >
        {loading ? (
          <div className='flex justify-center items-center min-h-screen'>
            <span className='text-sm text-gray-500 dark:text-gray-300'>
              로딩 중...
            </span>
          </div>
        ) : (
          <AuthGuard>{children}</AuthGuard>
        )}
      </body>
    </html>
  );
}
