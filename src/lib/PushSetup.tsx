'use client';
import { useEffect } from 'react';
import { usePushNotifications } from './notifications';

export default function PushSetup() {
  const { requestPermissionAndGetToken, listenToMessages } =
    usePushNotifications();

  useEffect(() => {
    requestPermissionAndGetToken();

    listenToMessages((payload) => {
      console.log('📥 Foreground message received:', payload);
    });
  }, [listenToMessages, requestPermissionAndGetToken]);

  return null;
}
