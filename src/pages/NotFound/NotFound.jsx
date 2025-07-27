import css from "./NotFound.module.css";

const NotFound = () => {
  return (
    <section className={css.notFoundPageSection}>
      <img
        className={css.gifNotFound}
        src="https://cdn.svgator.com/images/2024/04/animated-bored-cat-404-page.gif"
        alt="Not Found Animation"
      />
    </section>
  );
};

export default NotFound;
