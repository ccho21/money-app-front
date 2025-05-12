// 📄 경로: /middleware.ts

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token');

  // ✅ access_token이 없으면 signin 페이지로 리디렉트
  if (!accessToken) {
    const signinUrl = new URL('/auth/signin', request.url);
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

// ✅ 로그인된 유저만 접근 가능한 페이지 지정
export const config = {
  matcher: [
    // dashboard
    '/dashboard/:path*',

    // 트랜잭션 등록/수정
    '/transaction/:path*',

    // 달력 및 통계
    '/calendar/:path*',
    '/summary/:path*',

    // 계좌/카테고리 설정
    '/accounts/:path*',
    '/category/:path*',

    // 기타 로그인 필요 경로들 (추가 가능)
  ],
};
