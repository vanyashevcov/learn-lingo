import Loader from "../../components/Loader/Loader";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import FilterBar from "../../components/FilterBar/FilterBar";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import { useTeachers } from "../../hooks/useTeachers";
import css from "./Teachers.module.css";

const Teachers = () => {
  const { visibleTeachers, loading, loadMore, hasMore, handleFilterChange } = useTeachers();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ThemeToggle />
      <section className={css.teachersSection}>
          <div className={css.teacherContainer}>
            <FilterBar onFilterChange={handleFilterChange} />
            
            <ul className={css.teacherList}>
              {visibleTeachers.map((teacher, index) => (
                <TeacherCard key={teacher.id || index} data={teacher} />
              ))}
            </ul>
            {hasMore && (
              <div className={css.loadMoreContainer}>
                <button onClick={loadMore} className={css.loadMoreButton}>
                  Load More
                </button>
              </div>
            )}
          </div>
      </section>
    </>
  );
};

export default Teachers;
