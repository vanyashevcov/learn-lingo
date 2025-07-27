import { PuffLoader } from "react-spinners";
import css from "./Loader.module.css";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";

const Loader = () => {
  return (
    <>
      <ThemeToggle />
      <div className={css.wrapper}>
        <PuffLoader size={150} color="var(--color-primary)" />
      </div>
    </>
  );
};

export default Loader;
