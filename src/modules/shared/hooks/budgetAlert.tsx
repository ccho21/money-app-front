'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useSocket } from '@/providers/SocketProvider';

interface BudgetAlertPayload {
  category: string;
  message: string;
}

export function useBudgetAlert() {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    const handler = ({ category, message }: BudgetAlertPayload) => {
      toast(message, { description: category, position: 'top-center' });
    };

    socket.on('budget_alert', handler);
    return () => {
      socket.off('budget_alert', handler);
    };
  }, [socket]);
}
