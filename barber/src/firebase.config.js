import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import "firebase/storage";
// Import it from your preferred package.


import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDERS_ID, APP_ID, MEASUREMENT_ID } from "@env"

export const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDERS_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const authF = firebase.auth(app);
export const authFire = authF;

const fire = firebase.firestore();
fire.settings({ experimentalForceLongPolling: true });
export const db = fire

const fireStorage = firebase.storage();
export const fireBaseStorage = fireStorage;