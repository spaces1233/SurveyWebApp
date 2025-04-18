import * as Yup from "yup";

export const signInValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

export const signUpValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  username: Yup.string()
    // .min(6, "Username must be at least 6 characters")
    .required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

export const editValidationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  username: Yup.string()
    // .min(6, "Username must be at least 6 characters")
    .required("Required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
});
