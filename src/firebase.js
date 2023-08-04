import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTHTyzkhbryuY_-M8ngARYhZGeF9c7gsI",
  authDomain: "myblog-eb9db.firebaseapp.com",
  projectId: "myblog-eb9db",
  storageBucket: "myblog-eb9db.appspot.com",
  messagingSenderId: "297149446291",
  appId: "1:297149446291:web:f884812a6163f14c06b566",
  measurementId: "G-7S831LY5FF"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);