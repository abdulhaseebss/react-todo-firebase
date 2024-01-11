import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDwHXV8IB2c3s8b_YSPlomyDLAMFxm_iYU",
  authDomain: "new-project-80129.firebaseapp.com",
  projectId: "new-project-80129",
  storageBucket: "new-project-80129.appspot.com",
  messagingSenderId: "396200096303",
  appId: "1:396200096303:web:24d84b3a99abe5cba5ccda",
  measurementId: "G-EDDEDH1R5E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
