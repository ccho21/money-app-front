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
// * Alert and Recurring Insights - DONE
// * 차트 색상 어떻게 할지. - DONE
// * 카테고리, 어카운트, 색상 어떻게 할지. - DONE
// * transaction form store -> deep equal 고치기 - DONE
// * Budget Account Category 페이지 강화 - DONE
// budget이 셋 되지 않았더라도 그 이전에 설정된 것이 있으면 그걸 따라 가야되는건데, 그게 안보이면 좀 그런데 이부분을 어떻게 구현해야될까? - DONE
// * 어카운트 디테일 페이지에서, 트랜즈액션 큐뮬레이트 되는거 보여줘 - DONE

// * Recurring transaction / transaction soft delete - DONE

// * 미래 트랜잭션 생성 실패 시 (예: accountId가 삭제됨), 예외 처리 정책을 어떻게 둘까? 무시할지, 알림을 줄지?
// * Notification
// * LOG (User Activity)
// * Google Redirect

// * 유닛 테스트.
// * E2E 테스트
// * PWA

// * DEPLOY PHASE 1
// * settings menu implementation - Parially DONE
// * EXPORT EXCEL
// * AI Integration
