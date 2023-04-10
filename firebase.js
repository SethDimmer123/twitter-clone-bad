// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmuwCW4UXL864Sop3OwD5IiGo9YItkgyU",
    authDomain: "twitter-clone-3964a.firebaseapp.com",
    projectId: "twitter-clone-3964a",
    storageBucket: "twitter-clone-3964a.appspot.com",
    messagingSenderId: "1017075334592",
    appId: "1:1017075334592:web:e2d3f75b5b971dd3595c25"
  };


// Initialize Firebase using nextjs
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();//nextjs
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };