import { useState, useEffect, useMemo } from "react";
import { getDatabase, ref, get } from "firebase/database";
import toast from "react-hot-toast";

export const useTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [visibleTeachers, setVisibleTeachers] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    language: "French",
    level: "A1 Beginner",
    price: "30 $"
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const db = getDatabase();
        const teachersRef = ref(db, "teachers");
        const snapshot = await get(teachersRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const teachersArray = Array.isArray(data) ? data : Object.values(data);
          
          setTeachers(teachersArray);
          setVisibleTeachers(teachersArray.slice(0, 3));
        } else {
          toast.error("No teachers available at the moment.");
        }
      } catch (error) {
        console.error("Error loading teachers:", error);
        toast.error("Failed to load teachers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const filteredTeachers = useMemo(() => {
    return teachers.filter(teacher => {
      const languageMatch = teacher.languages && 
        teacher.languages.some(lang => 
          lang.toLowerCase() === filters.language.toLowerCase()
        );

      const levelMatch = teacher.levels && 
        teacher.levels.some(level => 
          level.toLowerCase() === filters.level.toLowerCase()
        );

      const selectedPrice = parseInt(filters.price.replace(/\D/g, ''));
      const priceMatch = teacher.price_per_hour <= selectedPrice;

      return languageMatch && levelMatch && priceMatch;
    });
  }, [teachers, filters]);

  useEffect(() => {
    setVisibleTeachers(filteredTeachers.slice(0, 3));
    setVisibleCount(4);
  }, [filteredTeachers]);

  const loadMore = () => {
    const nextCount = visibleCount + 3;
    setVisibleTeachers(filteredTeachers.slice(0, nextCount));
    setVisibleCount(nextCount);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return {
    teachers,
    visibleTeachers,
    visibleCount,
    loading,
    loadMore,
    hasMore: visibleCount < filteredTeachers.length,
    handleFilterChange,
    filters
  };
}; 