import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import config from './config';

const app = initializeApp(config.firebaseConfig);
const storage = getStorage(app, config.firebaseStorage);

export default storage;
