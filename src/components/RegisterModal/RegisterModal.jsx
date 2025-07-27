import { useEffect } from "react";
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

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("noScroll");
    } else {
      document.documentElement.classList.remove("noScroll");
      reset();
    }

    return () => {
      document.documentElement.classList.remove("noScroll");
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

  return (
    <>
      <ThemeToggle />
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        className={css.modal}
        overlayClassName={css.overlay}
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
              Sign Up
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default RegisterModal;
