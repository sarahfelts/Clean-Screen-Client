import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseCredentials = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
};

const app = !getApps().length ? initializeApp(firebaseCredentials) : getApps()[0];  // Ensuring Firebase is initialized only once

const auth = getAuth(app);   // Initialize Firebase Authentication
const database = getDatabase(app);  // Initialize Firebase Realtime Database (if needed)

export { app, auth, database };

