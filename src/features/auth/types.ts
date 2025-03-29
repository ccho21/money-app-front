export interface User {
  id: string;
  email: string;
  timezone?: string;
}

export interface SigninResponse {
  access_token: string;
}
