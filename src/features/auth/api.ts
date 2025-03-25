export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// ✅ 인증된 GET 요청 (access_token 쿠키 포함됨)
export async function authGet<Res>(url: string): Promise<Res> {
  const res = await fetch(`${API_BASE_URL}${url}`, {
    method: "GET",
    credentials: "include", // ✅ httpOnly 쿠키 기반 인증 필수
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "인증 실패");
  }

  return res.json() as Promise<Res>;
}
