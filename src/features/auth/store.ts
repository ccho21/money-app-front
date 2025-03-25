import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User } from './types';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  signout: () => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }, false, 'setUser'),
      signout: () => {
        sessionStorage.removeItem('accessToken');
        set({ user: null });
      },
    }),
    { name: 'UserStore' }
  )
);
