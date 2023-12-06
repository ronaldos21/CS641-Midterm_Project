// firebase.js
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyAvUWR2KxOORZQnS_qMRoaCI8dsgvHFG3U',
  authDomain: 'notekeeperapp-9b931.firebaseapp.com',
  projectId: 'notekeeperapp-9b931',
  storageBucket: 'notekeeperapp-9b931.appspot.com',
  messagingSenderId: '274923038294',
  appId: '1:274923038294:web:661c67a9116df7e52efdf7',
  measurementId: "G-PQQE7N1R45"
};

// Initialize Firebase
/*
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
const analytics = getAnalytics(app);
*/
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Export the auth and googleProvider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
