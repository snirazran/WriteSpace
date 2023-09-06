import { getEnvVar } from './utils/getENV';

const config = {
  unsplashAPI: `https://api.unsplash.com/`,
  unsplashAPIKEY: `?client_id=${getEnvVar('VITE_UNSPLASH_KEY')}`,
  baseURL: 'http://localhost:5173',
  firebaseConfig: {
    firebaseStorage: getEnvVar('VITE_FIREBASE_STORAGE'),
    apiKey: getEnvVar('VITE_API_KEY'),
    authDomain: getEnvVar('VITE_AUTH_DOMAIN'),
    projectId: getEnvVar('VITE_PROJECT_ID'),
    storageBucket: getEnvVar('VITE_STORAGE_BUCKET'),
    messagingSenderId: getEnvVar('VITE_MESSAGING_SENDER_ID'),
    appId: getEnvVar('VITE_APP_ID'),
  },
};

export default config;
