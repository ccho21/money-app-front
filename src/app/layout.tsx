// 📄 src/app/layout.tsx
'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import '@/app/globals.css';
import '@/styles/theme.css';
import AuthGuard from '@/components/auth/AuthGuard';
import RouteTracker from '@/providers/RouteTracker';
import { ThemeProvider } from '../providers/ThemeProvider';
import useAuthRedirectSync from '@/modules/auth/useAuthRedirectSync';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

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
  const pathname = usePathname();

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
            <RouteTracker />
            <ThemeProvider>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={pathname}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </ThemeProvider>
          </AuthGuard>
        )}
        <Toaster position='top-right' reverseOrder={false} />
      </body>
    </html>
  );
}
