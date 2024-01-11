import * as yup from "yup";

export const projectSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  desc: yup.string().required("Description is required"),
});
