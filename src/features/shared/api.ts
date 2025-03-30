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

// ✅ GET
export function get<T>(path: string): Promise<T> {
  return api<T>(path, { method: 'GET' });
}

// ✅ POST
export function post<Res, Req>(path: string, data: Req): Promise<Res> {
  return api<Res>(path, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ✅ PUT
export function put<Res, Req>(path: string, data: Req): Promise<Res> {
  return api<Res>(path, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

// ✅ DELETE
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
