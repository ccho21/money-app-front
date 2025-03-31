// 📄 경로: src/features/shared/api/index.ts

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    const message = error.message || 'API 요청 실패';
    throw new Error(message);
  }
  return res.json();
}

export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include',
  });

  return handleResponse<T>(res);
}

// GET
export function get<T>(path: string): Promise<T> {
  return api<T>(path, { method: 'GET' });
}

// POST
export function post<Res, Req>(path: string, data: Req): Promise<Res> {
  return api<Res>(path, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// PUT
export function put<Res, Req>(path: string, data: Req): Promise<Res> {
  return api<Res>(path, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export function del<T = void>(path: string): Promise<T> {
  return api<T>(path, {
    method: 'DELETE',
  });
}

export function patch<Res, Req>(path: string, data: Req): Promise<Res> {
  return api<Res>(path, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

// 공통 fetch 함수
async function baseFetch<Res>(
  url: string,
  options: RequestInit = {},
  retry = true
): Promise<Res> {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    credentials: 'include',
  });

  if (res.status === 401 && retry) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      return baseFetch(url, options, false); // ✅ 1회 재시도
    } else {
      if (typeof window !== 'undefined') {
        window.location.href = '/signin'; // ✅ 세션 만료 시 자동 리디렉션
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

// 토큰 재발급 요청
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
