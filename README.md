# WriteSpace
A writing platform, to help writers manage their work and share it easily

# Getting Started
First, run the development server:
```
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open http://localhost:5173/ with your browser to see the result.

# Root DotEnv
add this to the .env file in the root dir
```
NODE_ENV = development
PORT = 5000
MONGO_URI = mongoDb URI
JWT_SECRET = JWT Secret
```

# Frontend DotEnv
add this to the .env file in the frontend dir
```
VITE_FIREBASE_STORAGE = FIREBASE_STORAGE
VITE_API_KEY = API_KEY
VITE_AUTH_DOMAIN = AUTH_DOMAIN
VITE_PROJECT_ID = PROJECT_ID
VITE_STORAGE_BUCKET = STORAGE_BUCKET
VITE_MESSAGING_SENDER_ID = MESSAGING_SENDER_ID
VITE_APP_ID = APP_ID
VITE_UNSPLASH_KEY = UNSPLASH_KEY
VITE_API_URL = "http://localhost:5000"
```
