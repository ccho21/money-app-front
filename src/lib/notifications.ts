import { getToken, onMessage, MessagePayload } from 'firebase/messaging';
import { getClientMessaging } from './messaging';

export const usePushNotifications = () => {
  const requestPermissionAndGetToken = async (): Promise<string | null> => {
    const permission = await Notification.requestPermission();
    console.log('🔐 Notification permission:', permission);
    if (permission !== 'granted') {
      console.warn('🔒 Permission not granted');
      return null;
    }

    const messaging = await getClientMessaging();
    if (!messaging) return null;

    const registration = await navigator.serviceWorker.ready;
    console.log('🛠 Service Worker ready:', registration);

    try {
      const token = await getToken(messaging, {
        vapidKey:
          'BHZ4sYTEaoEJLyONfJ7z7eS2NIWrJ2WnLfhRA8YbwvLaJdExRwgYJl7eJ2Yc4vJU9UV6H80CG4vGfx3HyGrV1Rg',
        serviceWorkerRegistration: registration,
      });

      if (!token) {
        console.warn('⚠️ FCM Token null.');
        return null;
      }

      return token;
    } catch (err) {
      console.error('🚫 FCM Token request fails:', err);
      return null;
    }
  };

  const listenToMessages = async (
    cb: (payload: MessagePayload) => void
  ): Promise<void> => {
    const messaging = await getClientMessaging();
    if (!messaging) return;

    onMessage(messaging, (payload) => {
      console.log('💬 Foreground message:', payload);
      cb(payload);
    });
  };

  return { requestPermissionAndGetToken, listenToMessages };
};
