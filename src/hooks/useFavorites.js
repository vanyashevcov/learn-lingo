import { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = auth.currentUser;
      
      if (!user) {
        toast.error("Please log in to view your favorites.");
        setFavorites([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const db = getDatabase();
        const snapshot = await get(ref(db, `favorites/${user.uid}`));

        if (snapshot.exists()) {
          const data = snapshot.val();
          const favoritesArray = Object.values(data);
          setFavorites(favoritesArray);
        } else {
          setFavorites([]);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast.error("Failed to load favorites.");
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = (teacherId) => {
    setFavorites((prev) => prev.filter((teacher) => teacher.id !== teacherId));
  };

  return { favorites, loading, removeFavorite };
}; 