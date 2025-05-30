'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useUserStore } from '@/modules/shared/stores/useUserStore';

interface SocketContextValue {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextValue>({ socket: null });

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const user = useUserStore((s) => s.user);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!user) {
      return;
    }

    const s = io('http://localhost:8080', {
      withCredentials: true,
      autoConnect: false,
      transports: ['websocket'],
    });

    setSocket(s);
    s.connect();

    return () => {
      s.disconnect();
      setSocket(null);
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
