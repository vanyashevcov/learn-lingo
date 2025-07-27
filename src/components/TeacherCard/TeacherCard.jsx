import { useState, useEffect } from "react";
import BookingModal from "../BookingModal/BookingModal";
import {
  generateTeacherKey,
  checkFavoriteStatus,
  toggleFavorite,
} from "../../utils/favorites";
import { useAuth } from "../../hooks/useAuth";
import Icon from "../Icons/Icon";
import css from "./TeacherCard.module.css";
import toast from "react-hot-toast";

const TeacherCard = ({ data, onRemove }) => {
  const { user } = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const teacherKey = generateTeacherKey(data);

  useEffect(() => {
    const checkFavorite = async () => {
      const favoriteStatus = await checkFavoriteStatus(teacherKey);
      setIsFavorite(favoriteStatus);
    };

    checkFavorite();
  }, [teacherKey]);

  const handleToggleFavorite = async () => {
    const newFavoriteStatus = await toggleFavorite(
      data,
      isFavorite,
      teacherKey
    );
    setIsFavorite(newFavoriteStatus);

    if (onRemove && !newFavoriteStatus) {
      onRemove(teacherKey);
    }
  };

  const handleBookTrial = () => {
    if (!user) {
      toast.error("Please log in to your account!");
      return;
    }
    setIsOpen(true);
  };

  return (
    <li className={css.teacherListItem}>
      <div className={css.teacherImageContainer}>
        <img
          className={css.teacherImage}
          src={data.avatar_url}
          alt={`${data.name} ${data.surname}`}
        />
        <Icon
          name="online"
          width={12}
          height={12}
          className={css.isOnlineImage}
        />
      </div>

      <div className={css.teacherContent}>
        <div className={css.teacherHeader}>
          <div className={css.teacherInfo}>
            <p className={css.languagesLabel}>Languages</p>
            <h2 className={css.teacherName}>
              {data.name} {data.surname}
            </h2>
          </div>

          <div className={css.statsContainer}>
            <ul className={css.languagesInfo}>
              <li className={css.statItem}>
                <Icon
                  name="book"
                  width={16}
                  height={16}
                  fill="transparent"
                  stroke="var(--color-text)"
                />
                <p>Lessons online</p>
              </li>
              <li className={css.statItem}>
                <p>Lessons done: {data.lessons_done}</p>
              </li>
              <li className={css.statItem}>
                <Icon
                  name="star"
                  width={16}
                  height={16}
                  fill="var(--color-star)"
                  stroke="var(--color-star)"
                />
                <p>Rating: {data.rating}</p>
              </li>
              <li className={css.statItem}>
                <p>
                  Price / 1 hour:{" "}
                  <span className={css.priceText}>{data.price_per_hour}$</span>
                </p>
              </li>
            </ul>

            <button
              onClick={handleToggleFavorite}
              className={css.favoriteButton}
            >
              <Icon
                name={"heart"}
                width={26}
                height={26}
                fill={isFavorite ? "var(--color-primary)" : "none"}
                stroke={
                  isFavorite ? "var(--color-primary)" : "var(--color-text)"
                }
              />
            </button>
          </div>
        </div>

        <div className={css.infoContainer}>
          <ul className={css.infoList}>
            <li>
              <p className={css.infoRow}>
                Speaks:{" "}
                <span className={css.infoRowText}>
                  <u>{data.languages.join(", ")}</u>
                </span>
              </p>
            </li>
            <li>
              <p className={css.infoRow}>
                Lesson Info:{" "}
                <span className={css.infoRowText}>{data.lesson_info}</span>
              </p>
            </li>
            <li>
              <p className={css.infoRow}>
                Conditions:{" "}
                <span className={css.infoRowText}>
                  {data.conditions.join(" ")}
                </span>
              </p>
            </li>
            <li></li>
            <li></li>
          </ul>
        </div>

        {!showDetails && (
          <button
            onClick={() => setShowDetails(true)}
            className={css.readMoreBtn}
          >
            Read more
          </button>
        )}

        {showDetails && (
          <div className={css.detailsSection}>
            <p className={css.experienceText}>{data.experience}</p>

            <div className={css.reviewsSection}>
              <ul className={css.reviewsList}>
                {data.reviews.map((review, index) => (
                  <li key={index} className={css.reviewItem}>
                    <div className={css.reviewerInformation}>
                      {review.reviewer_avatar_url ? (
                        <img
                          className={css.reviewerImage}
                          src={review.reviewer_avatar_url}
                          alt={`${review.reviewer_name} avatar`}
                        />
                      ) : (
                        <div
                          className={css.reviewerImagePlaceholder}
                          style={{ backgroundColor: "var(--color-primary)" }}
                        >
                          {review.reviewer_name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className={css.reviewerDetails}>
                        <p className={css.reviewerName}>
                          {review.reviewer_name}
                        </p>
                        <div className={css.ratingBlock}>
                          <Icon
                            name="star"
                            width={16}
                            height={16}
                            fill="var(--color-star)"
                            stroke="var(--color-star)"
                          />
                          <span className={css.ratingText}>
                            {review.reviewer_rating}.0
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className={css.reviewComment}>{review.comment}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className={css.levelLangContainer}>
              {data.levels.map((level, index) => (
                <div key={index} className={css.levelLang}>
                  #{level}
                </div>
              ))}
            </div>

            <button onClick={handleBookTrial} className={css.bookTrialBtn}>
              Book trial lesson
            </button>
          </div>
        )}

        <BookingModal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          teacher={data}
        />
      </div>
    </li>
  );
};

export default TeacherCard;
