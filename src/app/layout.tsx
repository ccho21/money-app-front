// src/app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import ClientShell from '@/modules/main/components/ClientShell';
import { SocketProvider } from '@/providers/SocketProvider';
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
      <head>
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#ffffff' />
        <link
          rel='apple-touch-icon'
          href='/apple-touch-icon.png'
          sizes='180x180'
        />
      </head>
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
// * 유닛 테스트 - BACK - DONE.
// * TS LINT - BACK - DONE
// * 유닛 테스트 - FRONT - DONE
// * TS LINT - FRONT - DONE
// * settings menu implementation - Parially DONE

// * Calendar Design fix

// * E2E 테스트 - DONE
// * PWA - DONE
// * Gooe Browser Notification - DONE
// * Google Redirect
// * DEPLOY PHASE 1

// * PHASE 2
// * Notification - PHASE 2
// * LOG (User Activity) PHASE 2
// * 미래 트랜잭션 생성 실패 시 (예: accountId가 삭제됨), 예외 처리 정책을 어떻게 둘까? 무시할지, 알림을 줄지?
// * EXPORT EXCEL
// * AI Integration
// * weekly view
// * lazy loading

//* Insight 부분을 어떻게 해결해야될까? 무작정 insight 가 나오는게 아니라, 어느 조건에 맞춰졌을때만 발동이 되어야 되는데 지금은, 무조건 발동이 되고있으니가 조금 그래. 
//* chart 도 마찬가지. 일단은데이터를 보여주고있긴 하지만, 이렇게 보여주는게 맞는건지... 
