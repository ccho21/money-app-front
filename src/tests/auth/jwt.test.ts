// src/modules/auth/jwt.test.ts

import { decodeJwt } from "@/modules/auth/utils/jwt";

describe('decodeJwt', () => {
  const validToken = [
    // Header: {"alg":"HS256","typ":"JWT"}
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    // Payload: {"sub":"123","email":"test@example.com","iat":1718123456,"exp":1718127056}
    'eyJzdWIiOiIxMjMiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE3MTgxMjM0NTYsImV4cCI6MTcxODEyNzA1Nn0',
    // Signature (dummy)
    'dummySignature',
  ].join('.');

  it('should decode a valid JWT token', () => {
    const result = decodeJwt(validToken);
    expect(result).toEqual({
      sub: '123',
      email: 'test@example.com',
      iat: 1718123456,
      exp: 1718127056,
    });
  });

  it('should throw error for invalid token', () => {
    expect(() => decodeJwt('invalid.token')).toThrow();
  });
});
