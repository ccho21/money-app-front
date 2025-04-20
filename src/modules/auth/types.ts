export interface SignupDTO {
  email: string;
  password: string;
  timezone?: string;
}

export interface SigninDTO {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  timezone?: string;
}

export interface SigninResponse {
  access_token: string;
}
