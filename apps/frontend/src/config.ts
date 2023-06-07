function getEnvVar(name: string): string {
  const value = import.meta.env[name];

  if (value === null) {
    throw new Error(`Environment variable ${name} is not defined`);
  }

  return value;
}

const config = {
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
