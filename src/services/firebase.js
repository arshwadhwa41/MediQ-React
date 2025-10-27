import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyD4QEV91A5CH20dRr8nLfVXwVaVEigAqnA",
  authDomain: "mediq-aw.firebaseapp.com",
  projectId: "mediq-aw",
  storageBucket: "mediq-aw.firebasestorage.app",
  messagingSenderId: "379415350029",
  appId: "1:379415350029:web:eb2188338094b854083e44",
  measurementId: "G-YY6LLQTQ95"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;