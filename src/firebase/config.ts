import { initializeApp  } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmA3L35fx6BlzNnG-QShxGrVIfHlb27oU",
  authDomain: "hirescript-73d16.firebaseapp.com",
  projectId: "hirescript-73d16",
  storageBucket: "hirescript-73d16.firebasestorage.app",
  messagingSenderId: "270630783239",
  appId: "1:270630783239:web:dcde9ee7ea6f1de789dda2",
  measurementId: "G-JXM74W2WWE"
};

const app = initializeApp(firebaseConfig);

export const fireDB = getFirestore(app);