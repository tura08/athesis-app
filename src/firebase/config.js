import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4S9qcen6MxGRb6HpmwdqeeJQB3Sl2tQM",
  authDomain: "athesis-herbs.firebaseapp.com",
  projectId: "athesis-herbs",
  storageBucket: "athesis-herbs.appspot.com",
  messagingSenderId: "4353944358",
  appId: "1:4353944358:web:759e7cfdb616db8b1aefe7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
