import { getDatabase, ref, set, remove, get } from "firebase/database";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";

export const generateTeacherKey = (teacher) => {
  return teacher.id || `${teacher.name}_${teacher.surname}`.toLowerCase().replace(/\s/g, "_");
};

export const checkFavoriteStatus = async (teacherKey) => {
  const user = auth.currentUser;
  if (!user) return false;

  try {
    const db = getDatabase();
    const snapshot = await get(ref(db, `favorites/${user.uid}/${teacherKey}`));
    return snapshot.exists();
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return false;
  }
};

export const toggleFavorite = async (teacher, isFavorite, teacherKey) => {
  const user = auth.currentUser;

  if (!user) {
    toast.error("Please log in to your account!");
    return false;
  }

  const db = getDatabase();
  const favoriteRef = ref(db, `favorites/${user.uid}/${teacherKey}`);

  try {
    if (isFavorite) {
      await remove(favoriteRef);
      toast.success("Removed from favorites");
      return false;
    } else {
      const teacherToSave = {
        id: teacherKey,
        name: teacher.name,
        surname: teacher.surname,
        avatar_url: teacher.avatar_url,
        rating: teacher.rating,
        price_per_hour: teacher.price_per_hour,
        languages: teacher.languages,
        conditions: teacher.conditions,
        reviews: teacher.reviews,
        levels: teacher.levels,
      };

      await set(favoriteRef, teacherToSave);
      toast.success("Added to favorites");
      return true;
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    toast.error("Something went wrong");
    return isFavorite;
  }
}; 