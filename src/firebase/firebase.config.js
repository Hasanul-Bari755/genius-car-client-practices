// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZNyjxF46JhzZ9151WDh2uJuhFI7_kYyw",
  authDomain: "genius-car-practices.firebaseapp.com",
  projectId: "genius-car-practices",
  storageBucket: "genius-car-practices.appspot.com",
  messagingSenderId: "535041812871",
  appId: "1:535041812871:web:902e8fe6204043cc20cb22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;