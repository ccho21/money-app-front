// 📄 src/features/auth/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// ✅ 공통 fetch 핸들러 (리프레시 포함)

// 공통 fetch 함수
async function baseAuthFetch<Res>(
  url: string,
  options: RequestInit = {},
  retry = true
): Promise<Res> {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    credentials: 'include',
  });

  console.log('### RES', res);
  if (res.status === 401 && retry) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      // return baseAuthFetch(url, options, false); // ✅ 1회 재시도
    } else {
      if (typeof window !== 'undefined') {
        // window.location.href = '/signin'; // ✅ 세션 만료 시 자동 리디렉션
      }
      throw new Error('세션이 만료되었습니다.');
    }
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'API 요청 실패');
  }

  return res.json() as Promise<Res>;
}

// 인증된 GET 요청
export async function authPost<Res, Body = unknown>(
  url: string,
  body: Body
): Promise<Res> {
  return baseFetch<Res>(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

// ✅ 리프레시 토큰 요청
async function tryRefreshToken(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    return res.ok;
  } catch (err) {
    console.error('🔁 refreshToken 실패:', err);
    return false;
  }
}

// ✅ 인증된 GET 요청 (세션 자동 복원 포함)
export async function authGet<Res>(url: string): Promise<Res> {
  return baseAuthFetch<Res>(url, { method: 'GET' });
}
