import * as yup from "yup"

export const uploadSchema = yup.object({
  success: yup.boolean().required(),
  data: yup.object({
    id: yup.number().required(),
    candidate: yup.object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      photoUrl: yup.string().required(),
    }),
    certification: yup.object({
      abbreviatedType: yup.string().required(),
      status: yup.string().required(),
      examScore: yup.number().required(),
    }),
    reviewChecklists: yup.object({
      interviews: yup.array().required(),
    }),
    pastReviews: yup.array().required(),
  }),
})
