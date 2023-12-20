import * as yup from "yup";

export const validationSchema = yup.object({
  profileDetails: yup.string().required("Tell us yourself."),
  profileImg: yup.string().required("Enter a image to your profile. "),
  //   entryImg: yup.string().required("Enter a image to your post. "),
});
