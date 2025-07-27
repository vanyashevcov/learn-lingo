import { useState, useEffect, useRef } from "react";
import css from "./FilterBar.module.css";

const FilterBar = ({ onFilterChange }) => {
  const [isLanguagesOpen, setIsLanguagesOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState("French");
  const [selectedLevel, setSelectedLevel] = useState("A1 Beginner");
  const [selectedPrice, setSelectedPrice] = useState("30 $");

  const languagesRef = useRef(null);
  const levelRef = useRef(null);
  const priceRef = useRef(null);

  const languages = ["French", "English", "German", "Ukrainian", "Polish"];
  const levels = ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper-Intermediate"];
  const prices = ["10", "20", "30", "40"];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setIsLanguagesOpen(false);
    onFilterChange({ language, level: selectedLevel, price: selectedPrice });
  };

  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setIsLevelOpen(false);
    onFilterChange({ language: selectedLanguage, level, price: selectedPrice });
  };

  const handlePriceSelect = (price) => {
    setSelectedPrice(price + " $");
    setIsPriceOpen(false);
    onFilterChange({ language: selectedLanguage, level: selectedLevel, price: price + " $" });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languagesRef.current && !languagesRef.current.contains(event.target)) {
        setIsLanguagesOpen(false);
      }
      if (levelRef.current && !levelRef.current.contains(event.target)) {
        setIsLevelOpen(false);
      }
      if (priceRef.current && !priceRef.current.contains(event.target)) {
        setIsPriceOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={css.filterBar}>
      <div className={css.filterContainerLanguages}>
        <label className={css.filterLabel}>Languages</label>
        <div className={css.dropdownContainer} ref={languagesRef}>
          <button
            className={css.dropdownButton}
            onClick={() => setIsLanguagesOpen(!isLanguagesOpen)}
          >
            <span className={css.selectedValue}>{selectedLanguage}</span>
            <svg
              className={`${css.language} ${isLanguagesOpen ? css.languageUp : ""}`}
              width="20"
              height="20"
              fill="none"
              stroke="var(--color-text)"
            >
              <use href="/sprite.svg#icon-arrow-down"></use>
            </svg>
          </button>
          <ul
            className={
              `${css.dropdownList} ` +
              (isLanguagesOpen ? css['dropdownList--open'] : css['dropdownList--closed'])
            }
          >
            {languages.map((language) => (
              <li key={language}>
                <button
                  className={`${css.dropdownItem} ${selectedLanguage === language ? css.selected : ""}`}
                  onClick={() => handleLanguageSelect(language)}
                >
                  {language}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={css.filterContainerLevel}>
        <label className={css.filterLabel}>Level of knowledge</label>
        <div className={css.dropdownContainer} ref={levelRef}>
          <button
            className={css.dropdownButton}
            onClick={() => setIsLevelOpen(!isLevelOpen)}
          >
            <span className={css.selectedValue}>{selectedLevel}</span>
            <svg
              className={`${css.chevron} ${isLevelOpen ? css.chevronUp : ""}`}
              width="20"
              height="20"
              fill="none"
              stroke="var(--color-text)"
            >
              <use href="/sprite.svg#icon-arrow-down"></use>
            </svg>
          </button>
          <ul
            className={
              `${css.dropdownList} ` +
              (isLevelOpen ? css['dropdownList--open'] : css['dropdownList--closed'])
            }
          >
            {levels.map((level) => (
              <li key={level}>
                <button
                  className={`${css.dropdownItem} ${selectedLevel === level ? css.selected : ""}`}
                  onClick={() => handleLevelSelect(level)}
                >
                  {level}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={css.filterContainerPrice}>
        <label className={css.filterLabel}>Price</label>
        <div className={css.dropdownContainer} ref={priceRef}>
          <button
            className={css.dropdownButton}
            onClick={() => setIsPriceOpen(!isPriceOpen)}
          >
            <span className={css.selectedValue}>{selectedPrice}</span>
            <svg
              className={`${css.chevron} ${isPriceOpen ? css.chevronUp : ""}`}
              width="20"
              height="20"
              fill="none"
              stroke="var(--color-text)"
            >
              <use href="/sprite.svg#icon-arrow-down"></use>
            </svg>
          </button>
          <ul
            className={
              `${css.dropdownList} ` +
              (isPriceOpen ? css['dropdownList--open'] : css['dropdownList--closed'])
            }
          >
            {prices.map((price) => (
              <li key={price}>
                <button
                  className={`${css.dropdownItem} ${selectedPrice === price + " $" ? css.selected : ""}`}
                  onClick={() => handlePriceSelect(price)}
                >
                  {price}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FilterBar; 