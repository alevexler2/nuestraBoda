// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3qcDpGyaNRcvlOMA5X5xw1d1UWD2ia20",
  authDomain: "nuestraboda-499ba.firebaseapp.com",
  projectId: "nuestraboda-499ba",
  storageBucket: "nuestraboda-499ba.firebasestorage.app",
  messagingSenderId: "650528887207",
  appId: "1:650528887207:web:69ba04af10923964562682",
  measurementId: "G-5HJQJS18H2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
