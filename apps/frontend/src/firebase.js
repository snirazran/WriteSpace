import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from './config';

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, import.meta.env.VITE_FIREBASE_STORAGE);

export default storage;
