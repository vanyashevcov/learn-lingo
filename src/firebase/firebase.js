import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBjrbQ97-DFuqqL9y6CNmIRMRKAjlgsAng",
  authDomain: "learn-lingo-1f876.firebaseapp.com",
  databaseURL: "https://learn-lingo-1f876-default-rtdb.europe-west1.firebasedatabase.app", 
  projectId: "learn-lingo-1f876",
  storageBucket: "learn-lingo-1f876.firebasestorage.app",
  messagingSenderId: "979948122901",
  appId: "1:979948122901:web:08a7ea9b7782bd406bef1c",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);

export default app;
