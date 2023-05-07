import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD_2dLajGUxIZcdAvkieZsYtqmYgN6yM4U",
  authDomain: "helpdesk-2745f.firebaseapp.com",
  projectId: "helpdesk-2745f",
  storageBucket: "helpdesk-2745f.appspot.com",
  messagingSenderId: "538876725970",
  appId: "1:538876725970:web:6205bed454c8aa126c3b0b"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };