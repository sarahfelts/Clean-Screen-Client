import { getAuth, signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '../src/firebase/firebaseConfig'; // Import the initialized auth from your firebaseConfig.js
import { clientCredentials } from './client';

// Check if the user exists in your backend
const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/checkuser`, {
    method: 'POST',
    body: JSON.stringify({ uid }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

// Register a new user in your backend
const registerUser = (userInfo) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/register`, {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

// Sign in using Google Auth
const signIn = async () => {
  const provider = new GoogleAuthProvider(); // GoogleAuthProvider for sign-in
  try {
    const result = await signInWithPopup(auth, provider); // Use signInWithPopup with Firebase v9 modular syntax
    const user = result.user;
    console.log('User signed in:', user);
  } catch (error) {
    console.error('Error signing in:', error);
  }
};

// Sign out the current user
const signOut = async () => {
  try {
    await firebaseSignOut(auth); // Use signOut from Firebase v9 modular syntax
    console.log('User signed out');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};

export {
  signIn,
  signOut,
  checkUser,
  registerUser,
};
