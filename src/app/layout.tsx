'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import BottomTabBar from '@/components/ui/BottomTabBar';
import AuthGuard from '@/components/auth/AuthGuard';
import useAuthRedirectSync from '@/hooks/useAuthRedirectSync';

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
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {loading ? (
          <div className='flex justify-center items-center min-h-screen'>
            <span className='text-sm text-gray-500 dark:text-gray-300'>
              로딩 중...
            </span>
          </div>
        ) : (
          <>
            <AuthGuard>{children}</AuthGuard>
            <BottomTabBar />
          </>
        )}
      </body>
    </html>
  );
}
