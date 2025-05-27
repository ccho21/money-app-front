import { useUserStore } from '@/modules/shared/stores/useUserStore';

export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:8080/api' // ✅ vercel.json 프록시용
    : 'http://localhost:8080/api'; // ✅ 로컬 백엔드 직접 요청

// ⛳ 에러 응답 핸들링
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    const message = error.message || 'API 요청 실패';
    throw new Error(message);
  }
  return res.json();
}

// ✅ Refresh 토큰 시도 함수
async function tryRefreshToken(): Promise<boolean> {
  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include', // 반드시 있어야 함 (쿠키 기반 인증 시)
  });
  return res.ok;
}

function logoutAndRedirect() {
  const { clear } = useUserStore.getState();
  clear();
}

// 🌐 공통 fetch 함수
export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {


  let res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include',
  });

  // ✅ 401 에러 시 자동 Refresh + 재시도
  if (res.status === 401) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      res = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
        },
        credentials: 'include',
      });
    }

    if (res.status === 401) {
      logoutAndRedirect();
      return Promise.reject('Unauthorized');
    }
  }

  return handleResponse<T>(res);
}

// ✅ HTTP 메서드 래퍼
export function get<T>(path: string): Promise<T> {
  return api<T>(path, { method: 'GET' });
}

export function post<Res, Req>(path: string, data: Req): Promise<Res> {
  console.log('## API BASE_URL', API_BASE_URL);

  return api<Res>(path, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

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

export function handleAsync<T>(
  asyncFn: () => Promise<T>,
  setLoading: (l: boolean) => void,
  setError: (e: string | null) => void
): Promise<T | undefined> {
  setLoading(true);
  setError(null);
  return asyncFn()
    .catch((err) => {
      const msg = err instanceof Error ? err.message : '요청 실패';
      setError(msg);
      console.error('❌ Service Error:', msg);
      return undefined;
    })
    .finally(() => {
      setLoading(false);
    });
}
