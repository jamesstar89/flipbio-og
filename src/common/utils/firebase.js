import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const dev = String(process.env.NEXT_PUBLIC_REACT_APP_IS_DEV) === 'true';

const config = {
	apiKey: (dev) ? process.env.NEXT_PUBLIC_REACT_APP_DEV_API_KEY : process.env.NEXT_PUBLIC_REACT_APP_PROD_API_KEY,
	authDomain: (dev) ? process.env.NEXT_PUBLIC_REACT_APP_DEV_AUTH_DOMAIN : process.env.NEXT_PUBLIC_REACT_APP_PROD_AUTH_DOMAIN,
	databaseURL: (dev) ? process.env.NEXT_PUBLIC_REACT_APP_DEV_DATABASE_URL : process.env.NEXT_PUBLIC_REACT_APP_PROD_DATABASE_URL,
	projectId: (dev) ? process.env.NEXT_PUBLIC_REACT_APP_DEV_PROJECT_ID : process.env.NEXT_PUBLIC_REACT_APP_PROD_PROJECT_ID,
	storageBucket: (dev) ? process.env.NEXT_PUBLIC_REACT_APP_DEV_STORAGE_BUCKET_ID : process.env.NEXT_PUBLIC_REACT_APP_PROD_STORAGE_BUCKET_ID,
	messagingSenderId: (dev) ? process.env.NEXT_PUBLIC_REACT_APP_DEV_MESSAGING_SENDER_ID : process.env.NEXT_PUBLIC_REACT_APP_PROD_MESSAGING_SENDER_ID,
	appId: (dev) ? process.env.NEXT_PUBLIC_REACT_APP_DEV_APP_ID : process.env.NEXT_PUBLIC_REACT_APP_PROD_APP_ID,
	measurementId: (dev) ? process.env.NEXT_PUBLIC_REACT_APP_DEV_MEASUREMENT_ID : process.env.NEXT_PUBLIC_REACT_APP_PROD_MEASUREMENT_ID
}

const firebaseConfig = config;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const fbdb = getDatabase(app);
export const fbStorage = getStorage(app);