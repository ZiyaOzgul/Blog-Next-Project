"use client";

import * as yup from "yup";

export const validationSchema = yup.object({
  userName: yup.string().required("Please enter your username"),
  userMail: yup.string().required("Please enter your Email"),
  userPassword: yup
    .string()
    .min(8, "Password must contain at least 8 characters")
    .required("Please enter your password"),
});
