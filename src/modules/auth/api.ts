// 📄 src/features/auth/api.ts
import { SigninDTO, SignupDTO, User } from './types';
import { get, post } from '@/modules/shared/common/api';

export const signinAPI = (payload: SigninDTO): Promise<User> => {
  return post<User, SigninDTO>('/auth/signin', payload);
};

export const signupAPI = (payload: SignupDTO): Promise<User> => {
  return post<User, SigninDTO>('/auth/signup', payload);
};

export const fetchUserAPI = (): Promise<User> => {
  return get<User>('/auth/me');
};

export const signoutAPI = (): Promise<void> => {
  return post('/auth/signout', {});
};
