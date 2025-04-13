// 📄 src/app/layout.tsx
'use client';
import { Geist, Geist_Mono } from 'next/font/google';

import { Toaster } from 'react-hot-toast';
import '@/app/globals.css';
import '@/styles/theme.css';
import useAuthRedirectSync from '@/features/auth/useAuthRedirectSync';
import AuthGuard from '@/components/AuthGuard';
import { StrictMode } from 'react';
import RouteTracker from '@/providers/RouteTracker';
import { ThemeProvider } from '../providers/ThemeProvider';
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-surface text-foreground dark:bg-surface dark:text-foreground`}
      >
        {loading ? (
          <div className='flex justify-center items-center min-h-screen'>
            <span className='text-sm text-muted dark:text-muted-foreground'>
              로딩 중...
            </span>
          </div>
        ) : (
          <AuthGuard>
            <StrictMode>
              <RouteTracker />
              <ThemeProvider>{children}</ThemeProvider>
            </StrictMode>
          </AuthGuard>
        )}
        <Toaster position='top-right' reverseOrder={false} />
      </body>
    </html>
  );
}
