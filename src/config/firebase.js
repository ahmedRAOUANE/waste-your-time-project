
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0fcdnGw-46OJHN65n7JS0wdSfam0DCuc",
  authDomain: "waste-your-time-project.firebaseapp.com",
  projectId: "waste-your-time-project",
  storageBucket: "waste-your-time-project.appspot.com",
  messagingSenderId: "167564822490",
  appId: "1:167564822490:web:aca9461060a1719dae22e3",
  measurementId: "G-7KMF3G6MTH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
