// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCIELBE_arT-7XMbT8oLiVMFHxPE5B7Nic',
  authDomain: 'money-app-message.firebaseapp.com',
  projectId: 'money-app-message',
  storageBucket: 'money-app-message.firebasestorage.app',
  messagingSenderId: '117154980262',
  appId: '1:117154980262:web:82f032b20975d1343b2f67',
  measurementId: 'G-W82NQLT8YW',
};

export const firebaseApp = initializeApp(firebaseConfig);