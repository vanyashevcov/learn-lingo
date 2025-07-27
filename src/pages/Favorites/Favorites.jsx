import TeacherCard from "../../components/TeacherCard/TeacherCard";
import Loader from "../../components/Loader/Loader";
import { useFavorites } from "../../hooks/useFavorites";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import css from "./Favorites.module.css";

const Favorites = () => {
  const { favorites, loading, removeFavorite } = useFavorites();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ThemeToggle />
      <section className={css.favoritesSection}>
        <div className="container">
          {favorites.length === 0 ? (
            <p className={css.emptyMessage}>
              You have no favorite teachers yet.
            </p>
          ) : (
            <ul className={css.teacherList}>
              {favorites.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  data={teacher}
                  onRemove={removeFavorite}
                />
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default Favorites;
