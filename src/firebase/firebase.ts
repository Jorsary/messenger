import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHrujR7n8q6UPorLLQxx0v9SYwjns8_xI",
  authDomain: "task-manager-f1d8b.firebaseapp.com",
  databaseURL:
    "https://task-manager-f1d8b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "task-manager-f1d8b",
  storageBucket: "task-manager-f1d8b.appspot.com",
  messagingSenderId: "706813468472",
  appId: "1:706813468472:web:3d1ede580c13134c80abcd",
  measurementId: "G-5X7YEYD32W",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const realdb = getDatabase();
export const messaging = getMessaging(app);
