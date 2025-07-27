import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import css from "./BookingModal.module.css";
import { useEffect } from "react";
import toast from "react-hot-toast";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";
import Icon from "../Icons/Icon";

const schema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  reason: yup.string().required("Select a reason"),
});

const reasons = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

const BookingModal = ({ isOpen, onRequestClose, teacher }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      reason: "Career and business",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    toast.success("Lesson request successfully sent!");
    onRequestClose();
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
        <button className={css.closeBtn} onClick={onRequestClose}>
          <Icon
            name="close-btn"
            width={32}
            height={32}
            fill="transparent"
            stroke="var(--color-text)"
          />
        </button>
        <div className={css.scrollWrapper}>
          <div className={css.content}>
            <h2 className={css.title}>Book trial lesson</h2>
            <p className={css.description}>
              Our experienced tutor will assess your current language level,
              discuss your learning goals, and tailor the lesson to your
              specific needs.
            </p>
            <div className={css.teacherInfo}>
              <img src={teacher.avatar_url} alt={teacher.name} />
              <div>
                <p className={css.yourTeacher}>Your teacher</p>
                <p className={css.teacherName}>
                  {teacher.name} {teacher.surname}
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
              <p className={css.label}>
                What is your main reason for learning English?
              </p>
              <div className={css.radioGroup}>
                {reasons.map((item, index) => (
                  <label key={index} className={css.radioLabel}>
                    <input
                      type="radio"
                      value={item}
                      {...register("reason")}
                      onChange={() => setValue("reason", item)}
                      className={css.radioInput}
                    />
                    <span className={css.radioText}>{item}</span>
                  </label>
                ))}
              </div>
              {errors.reason && (
                <p className={css.error}>{errors.reason.message}</p>
              )}
              <input
                className={css.input}
                placeholder="Full Name"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className={css.error}>{errors.fullName.message}</p>
              )}
              <input
                className={css.input}
                placeholder="Email"
                {...register("email")}
              />
              {errors.email && (
                <p className={css.error}>{errors.email.message}</p>
              )}
              <input
                className={css.input}
                placeholder="Phone number"
                {...register("phone")}
              />
              {errors.phone && (
                <p className={css.error}>{errors.phone.message}</p>
              )}
              <button type="submit" className={css.bookBtn}>
                Book
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BookingModal;
