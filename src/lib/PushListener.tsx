'use client';

import { useEffect } from 'react';
import { usePushNotifications } from './notifications';

export default function PushListener() {
  const { listenToMessages } = usePushNotifications();

  useEffect(() => {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js', { scope: '/' })
      .then((reg) => {
        console.log('✅ firebase-messaging-sw.js 등록 성공:', reg);
      })
      .catch((err) => {
        console.error('❌ 서비스 워커 등록 실패:', err);
      });

    listenToMessages((payload) => {
      const { title, body } = payload.notification ?? {};
      if (Notification.permission === 'granted') {
        new Notification(title ?? '📬 알림', {
          body: body ?? '내용 없음',
        });
      }
    });
  }, [listenToMessages]);

  return null;
}
