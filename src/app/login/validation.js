import * as yup from "yup";

export const validationSchema = yup.object({
  userMail: yup.string().required("Please enter your password."),
  userPassword: yup
    .string()
    .min(8, "Passsword must be more then 8 characters.")
    .required("Please enter your password."),
});
