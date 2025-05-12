// src/app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google';
import ClientShell from '@/components_backup/shell/ClientShell';
import '@/app/globals.css';
import '@/styles/theme.css';

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiase bg-background text-foreground dark:bg-background dark:text-foreground`}
      >
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
