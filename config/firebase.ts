import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyCmeoUdGgz0Ih5D0S2IshP00wnVu6GN1YU",
  authDomain: "ai-gohan-project-573df.firebaseapp.com",
  projectId: "ai-gohan-project-573df",
  storageBucket: "ai-gohan-project-573df.firebasestorage.app",
  messagingSenderId: "912488183874",
  appId: "1:912488183874:web:2a9097062f12d7ee79d5db"
};

// Firebaseアプリの初期化
const app = initializeApp(firebaseConfig);

// Firestore、Auth、Storageの初期化
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// デバッグ用
console.log('Firebase初期化完了:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain
});

export default app;
