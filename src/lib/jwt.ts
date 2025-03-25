import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export function decodeJwt(token: string): DecodedToken {
  return jwtDecode(token);
}
