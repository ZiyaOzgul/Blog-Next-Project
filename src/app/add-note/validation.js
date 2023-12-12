import * as yup from "yup";

export const validationSchema = yup.object({
  entryTitle: yup.string().required("Enter a title."),
  entryDesc: yup.string().required("Enter a description."),
  entryDetail: yup.string().required("Enter details of post."),
  //   entryImg: yup.string().required("Enter a image to your post. "),
});
