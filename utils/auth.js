import {
  signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut,
} from 'firebase/auth';
import auth from '../src/firebase/firebaseConfig';
import { clientCredentials } from './client';

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
    const result = await signInWithPopup(auth, provider);
    const { user } = result;
    return user; // Return the signed-in user object
  } catch (error) {
    throw new Error('Failed to sign in. Please try again.');
  }
};

// Sign out the current user
const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    // Handle successful sign out with a return or feedback
    return 'Sign out successful';
  } catch (error) {
    // Replace console.error with error handling
    throw new Error('Failed to sign out. Please try again.');
  }
};

export {
  signIn, signOut, checkUser, registerUser,
};
