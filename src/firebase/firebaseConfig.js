// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA1uc1Stjdbfrd6YtLx6tG9tHMFWIAvCwI",
    authDomain: "react-app-cursos-4200c.firebaseapp.com",
    projectId: "react-app-cursos-4200c",
    storageBucket: "react-app-cursos-4200c.appspot.com",
    messagingSenderId: "427930876106",
    appId: "1:427930876106:web:989747fcade8b3900f5c33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db }