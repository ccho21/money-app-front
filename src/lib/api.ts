// src/lib/api.ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

// ✅ 인증된 GET 요청 (access_token 쿠키 포함됨)
export async function authGet<Res>(url: string): Promise<Res> {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    method: 'GET',
    credentials: 'include', // ✅ httpOnly 쿠키 기반 인증 필수
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || '인증 실패');
  }

  return res.json() as Promise<Res>;
}

export async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include', // JWT 쿠키 포함
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'API 요청 실패');
  }

  return res.json();
}

// ✅ 일반 POST 요청 (회원가입, 인증 등에서 사용)
export async function post<Res, Req>(url: string, data: Req): Promise<Res> {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || '요청 실패');
  }

  return res.json() as Promise<Res>;
}

// ✅ 현재 로그인된 사용자 정보 요청 (SSR 또는 클라이언트 로그인 유지 시 사용)
export async function fetchMe<Res>(): Promise<Res> {
  return authGet('/auth/me');
}
