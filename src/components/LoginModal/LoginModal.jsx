import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "../../firebase/firebase";
import { loginSchema } from "../../constants/validation";
import toast from "react-hot-toast";
import css from "./LoginModal.module.css";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import Icon from "../Icons/Icon";

const LoginModal = ({ isOpen, onRequestClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(loginSchema) });

  const [show, setShow] = useState(isOpen);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setTimeout(() => setAnimate(true), 10);
    } else if (show) {
      setAnimate(false);
      setTimeout(() => setShow(false), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("noScroll");
    } else {
      document.body.classList.remove("noScroll");
      reset();
    }

    return () => {
      document.body.classList.remove("noScroll");
    };
  }, [isOpen, reset]);

  const onSubmit = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      onRequestClose();

      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid email or password. Please try again.");
    }
  };

  if (!show) return null;

  return (
    <>
      <ThemeToggle />
      <Modal
        isOpen={true}
        onRequestClose={onRequestClose}
        className={`${css.modal} ${animate ? css["modal--open"] : css["modal--closed"]}`}
        overlayClassName={`${css.overlay} ${animate ? css["overlay--open"] : css["overlay--closed"]}`}
      >
        <div className={css.container}>
          <button onClick={onRequestClose} className={css.close}>
            <Icon
              name="close-btn"
              width={32}
              height={32}
              fill="transparent"
              stroke="var(--color-text)"
            />
          </button>

          <h2 className={css.title}>Log In</h2>
          <p className={css.description}>
            Welcome back! Please enter your credentials to access your account
            and continue your search for a teacher.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className={css.loginForm}>
            <input
              className={`${css.input} ${css.inputEmail}`}
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}

            <input
              className={`${css.input} ${css.inputPassword}`}
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className={css.error}>{errors.password.message}</p>
            )}

            <button className={css.button} type="submit">
              Log In
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default LoginModal;
