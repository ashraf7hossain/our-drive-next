import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWc6OoXHS_p1YW7keUYQdAVxA6CzfQoZA",
  authDomain: "our-drive-5d9c3.firebaseapp.com",
  projectId: "our-drive-5d9c3",
  storageBucket: "our-drive-5d9c3.appspot.com",
  messagingSenderId: "912635525508",
  appId: "1:912635525508:web:e3eda85c010f464762c5d1",
  measurementId: "G-K062MKWBLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, provider, signInWithPopup, storage, db };