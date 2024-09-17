import axios from 'axios';
import { clientCredentials } from './client';

const checkUser = async () => {
  try {
    const response = await axios.get('http://localhost:8000/check-user/', {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error checking user', error);
    throw error;
  }
};

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

const signIn = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:8000/login/', {
      email,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error during sign-in', error);
    throw error;
  }
};

const signOut = async () => {
  try {
    const response = await axios.post('http://localhost:8000/logout/', {}, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error during sign-out', error);
    throw error;
  }
};

export {
  signIn, signOut, checkUser, registerUser,
};