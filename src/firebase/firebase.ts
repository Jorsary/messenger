import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAHrujR7n8q6UPorLLQxx0v9SYwjns8_xI",
  authDomain: "task-manager-f1d8b.firebaseapp.com",
  projectId: "task-manager-f1d8b",
  storageBucket: "task-manager-f1d8b.appspot.com",
  messagingSenderId: "706813468472",
  appId: "706813468472:web:3d1ede580c13134c80abcd",
  measurementId: "G-5X7YEYD32W",
  databaseURL:'https://task-manager-f1d8b-default-rtdb.europe-west1.firebasedatabase.app/'
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const realdb = getDatabase();
