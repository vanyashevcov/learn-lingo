import React, { useState, useEffect } from "react";
import styles from "./ThemeToggle.module.css";

export const COLORS = [
  {
    name: "yellow",
    cssVar: "var(--color-primary-yellow)",
    lightVar: "var(--color-primary-yellow-light)",
  },
  {
    name: "green",
    cssVar: "var(--color-primary-green)",
    lightVar: "var(--color-primary-green-light)",
  },
  {
    name: "blue",
    cssVar: "var(--color-primary-blue)",
    lightVar: "var(--color-primary-blue-light)",
  },
  {
    name: "red",
    cssVar: "var(--color-primary-red)",
    lightVar: "var(--color-primary-red-light)",
  },
  {
    name: "peach",
    cssVar: "var(--color-primary-peach)",
    lightVar: "var(--color-primary-peach-light)",
  },
];

export const COLOR_NAMES = COLORS.map(c => c.name);

export function getInitialColorIdx() {
  const saved = localStorage.getItem("themeColorIdx");
  return saved ? Number(saved) : 0;
}

const ThemeToggle = () => {
  const [colorIdx, setColorIdx] = useState(getInitialColorIdx);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-primary",
      COLORS[colorIdx].cssVar
    );
    document.documentElement.style.setProperty(
      "--color-primary-light",
      COLORS[colorIdx].lightVar
    );
    localStorage.setItem("themeColorIdx", colorIdx);
    window.dispatchEvent(new Event('themeColorChanged'));
  }, [colorIdx]);

  const handleSelect = (idx) => {
    setColorIdx(idx);
  };

  return (
    <div className={styles.toggle}>
      {COLORS.map((color, idx) => (
        <button
          key={color.name}
          className={
            idx === colorIdx
              ? `${styles.colorCircle} ${styles.active}`
              : styles.colorCircle
          }
          style={{ background: color.cssVar }}
          aria-label={`Вибрати ${color.name}`}
          onClick={() => handleSelect(idx)}
        />
      ))}
    </div>
  );
};

export default ThemeToggle; 