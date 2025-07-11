import { getMessaging, isSupported } from 'firebase/messaging';
import { firebaseApp } from './firebase';

export const getClientMessaging = async () => {
  if (typeof window === 'undefined') return null;

  const supported = await isSupported();
  if (!supported) return null;

  return getMessaging(firebaseApp); // ✅ Messaging만 반환
};
