import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email format"),
  password: yup.string().required("Password is required"),
});

export const registerSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email format"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
}); 