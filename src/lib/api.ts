// src/lib/api.ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// ✅ 인증된 GET 요청 (access_token 쿠키 포함됨)
export async function authGet<T>(url: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    method: "GET",
    credentials: "include", // ✅ 쿠키 자동 포함
  });

  console.log('### RES', res);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "인증 실패");
  }

  return res.json() as Promise<T>;
}

// ✅ 일반 POST 요청 (회원가입, 인증 등에서 사용)
export async function post<T>(url: string, data: any): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include", // ✅ 쿠키 인증이 필요한 경우 자동 포함
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "요청 실패");
  }

  return res.json() as Promise<T>;
}

// ✅ 현재 로그인된 사용자 정보 요청 (SSR 또는 클라이언트 로그인 유지 시 사용)
export async function fetchMe<T>(): Promise<T> {
  return authGet("/auth/me");
}
