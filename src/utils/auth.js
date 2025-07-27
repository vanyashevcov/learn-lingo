import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";

export const handleLogout = async () => {
  try {
    await signOut(auth);
    toast.success("Successfully logged out!");
    
    setTimeout(() => {
      window.location.reload();
    }, 300);
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Failed to logout. Please try again.");
  }
};

export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
}; 