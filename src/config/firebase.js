import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCasLJf3gh3Vpbt5CAe8FZTI4uSVEwrgJA",
  authDomain: "shopping-list-c7616.firebaseapp.com",
  databaseURL: "https://shopping-list-c7616-default-rtdb.firebaseio.com",
  projectId: "shopping-list-c7616",
  storageBucket: "shopping-list-c7616.appspot.com",
  messagingSenderId: "377943842539",
  appId: "1:377943842539:web:940ba3fba4904349a3a8ae",
  measurementId: "G-DNWJ50KYJJ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const GoogleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export const db = getFirestore(app)