import * as yup from 'yup';

export const userSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});



export const registerSchema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Minimum 8 characters")
        .matches(/[A-Z]/, "Must contain an uppercase letter")
        .matches(/[a-z]/, "Must contain a lowercase letter")
        .matches(/[0-9]/, "Must contain a number")
        .matches(/[^A-Za-z0-9]/, "Must contain a symbol"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),

    password: yup
        .string()
        .required("Password is required")
});

export const forgotPasswordSchema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required")
});


export const profileSchema = yup.object().shape({
    fullName: yup.string().required("Fullname wajib diisi"),
    email: yup.string().email("Format email tidak valid").required("Email wajib diisi"),
    phone: yup.string().nullable(),
    company: yup.string().nullable(),
    department: yup.string().nullable(),
    position: yup.string().nullable(),
    location: yup.string().nullable(),
    bio: yup.string().nullable(),
    instagram: yup.string().url("Harus berupa URL valid").nullable(),
});