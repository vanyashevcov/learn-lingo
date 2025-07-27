import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "../../firebase/firebase";
import { registerSchema } from "../../constants/validation";
import toast from "react-hot-toast";
import css from "./RegisterModal.module.css";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import Icon from "../Icons/Icon";

const RegisterModal = ({ isOpen, onRequestClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(registerSchema) });

  const [show, setShow] = useState(isOpen);
  const [animate, setAnimate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const onSubmit = async ({ name, email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });

      toast.success("Registered successfully!");
      onRequestClose();

      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
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

          <h2 className={css.title}>Registration</h2>
          <p className={css.description}>
            Thank you for your interest in our platform! In order to register,
            we need some information. Please provide us with the following
            information.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className={`${css.input} ${css.inputName}`}
              placeholder="Name"
              {...register("name")}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}

            <input
              className={`${css.input} ${css.inputEmail}`}
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}

            <div className={css.inputPasswordWrapper}>
              <input
                className={`${css.input} ${css.inputPassword}`}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
              />
              <button
                type="button"
                className={css.eyeButton}
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Icon
                  name="eye-off"
                  width={20}
                  height={20}
                  fill="transparent"
                  stroke="var(--color-text)"
                />
              </button>
            </div>
            {errors.password && (
              <p className={css.error}>{errors.password.message}</p>
            )}

            <button className={css.button} type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default RegisterModal;
