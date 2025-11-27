import * as yup from "yup";

export const resetPasswordSchema = yup.object().shape({
    password: yup
        .string()
        .required("Password is required")
        .min(8, "At least 8 characters"),
    confirmPassword: yup
        .string()
        .required("Confirm your password")
        .oneOf([yup.ref("password")], "Passwords do not match")
});
