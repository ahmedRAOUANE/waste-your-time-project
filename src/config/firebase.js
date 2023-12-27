// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
