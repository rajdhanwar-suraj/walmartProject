// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQm5uSJGgg1Jy0ZLyPoxxGR5QvBr8VsZ4",
  authDomain: "walmart-7ac85.firebaseapp.com",
  projectId: "walmart-7ac85",
  storageBucket: "walmart-7ac85.appspot.com",
  messagingSenderId: "829361306325",
  appId: "1:829361306325:web:8b30d2dee234b35249805c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app);

export { app, db, auth }; 