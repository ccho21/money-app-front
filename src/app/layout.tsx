// src/app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';
import { QueryProvider } from '@/modules/shared/providers/QueryProvider';
import ClientShell from '@/modules/main/components/ClientShell';
import { SocketProvider } from '@/modules/shared/providers/SocketProvider';
import { Toaster } from '@/components/ui/sonner';

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
        <QueryProvider>
          <SocketProvider>
            <ClientShell>{children}</ClientShell>
            <Toaster />
          </SocketProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

// TODO:
// * Recurring - DONE
// * Recurring Front-end - DONE
// * setting 정리 - DONE
// * 버젯 애드 업데이트 하기 - DONE
// * 소켓 프로그래밍 버젯 알람 - DONE
// * 카테고리, 어카운트, 색상 어떻게 할지.
// * Alert and Recurring Insights
// * Budget Account Category 페이지 강화
// * 차트 색상 어떻게 할지.
// * 미래 트랜잭션 생성 실패 시 (예: accountId가 삭제됨), 예외 처리 정책을 어떻게 둘까? 무시할지, 알림을 줄지?

// * 유닛 테스트.
// * E2E 테스트
