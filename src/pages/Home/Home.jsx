import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import css from "./Home.module.css";
import ThemeToggle, { COLORS, getInitialColorIdx } from "../../components/ThemeToggle/ThemeToggle";
import girl1x from '../../images/girl-1x.png';
import girl2x from '../../images/girl-2x.png';
import macYellow1x from '../../images/mac-yellow-1x.png';
import macYellow2x from '../../images/mac-yellow-2x.png';
import macGreen1x from '../../images/mac-green-1x.png';
import macGreen2x from '../../images/mac-green-2x.png';
import macBlue1x from '../../images/mac-blue-1x.png';
import macBlue2x from '../../images/mac-blue-2x.png';
import macRed1x from '../../images/mac-red-1x.png';
import macRed2x from '../../images/mac-red-2x.png';
import macPeach1x from '../../images/mac-peach-1x.png';
import macPeach2x from '../../images/mac-peach-2x.png';

const macImages = {
  yellow: { '1x': macYellow1x, '2x': macYellow2x },
  green: { '1x': macGreen1x, '2x': macGreen2x },
  blue: { '1x': macBlue1x, '2x': macBlue2x },
  red: { '1x': macRed1x, '2x': macRed2x },
  peach: { '1x': macPeach1x, '2x': macPeach2x },
};

const Home = () => {
  const [colorIdx, setColorIdx] = useState(getInitialColorIdx());
  const macNames = ["yellow", "green", "blue", "red", "peach"];
  const macColor = macNames[colorIdx] || "yellow";

  useEffect(() => {
    const updateColorIdx = () => setColorIdx(getInitialColorIdx());
    window.addEventListener('themeColorChanged', updateColorIdx);
    window.addEventListener('storage', updateColorIdx);
    return () => {
      window.removeEventListener('themeColorChanged', updateColorIdx);
      window.removeEventListener('storage', updateColorIdx);
    };
  }, []);

  return (
    <>
      <ThemeToggle />
      <section className={css.homePageContainer}>
        <div className={css.heroContainer}>
          <div className={css.textContainer}>
            <h1 className={css.heroTitle}>
              Unlock your potential with the best{" "}
              <span className={css.highlighted}>language</span> tutors
            </h1>
            <p className={css.description}>
              Embark on an Exciting Language Journey with Expert Language
              Tutors: Elevate your language proficiency to new heights by
              connecting with highly qualified and experienced tutors.
            </p>
            <NavLink to="/teachers" className={`${css.getStartBtn} btn`}>
              Get started
            </NavLink>
          </div>
          <div className={css.imageContainer}>
            <img
              className={css.girlImage}
              src={girl1x}
              srcSet={`${girl1x} 1x, ${girl2x} 2x`}
              alt="Girl image"
            />
            <img
              className={css.macImage}
              src={macImages[macColor]["1x"]}
              srcSet={`${macImages[macColor]["1x"]} 1x, ${macImages[macColor]["2x"]} 2x`}
              alt="MacBook image"
              width={361}
              height={176}
            />
          </div>
        </div>

        <ul className={css.advantagesList}>
          <li className={css.advantagesItems}>
            <p className={css.quantity}>32,000 +</p>
            <p className={css.listDescription}>Experienced tutors</p>
          </li>
          <li className={css.advantagesItems}>
            <p className={css.quantity}>300,000 +</p>
            <p className={css.listDescription}>5-star tutor reviews</p>
          </li>
          <li className={css.advantagesItems}>
            <p className={css.quantity}>120 +</p>
            <p className={css.listDescription}>Subjects taught</p>
          </li>
          <li className={css.advantagesItems}>
            <p className={css.quantity}>200 +</p>
            <p className={css.listDescription}>Tutor nationalities</p>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Home;
