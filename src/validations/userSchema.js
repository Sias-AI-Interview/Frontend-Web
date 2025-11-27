import * as yup from 'yup';

export const userSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});


export const registerSchema = yup.object().shape({
    fullName: yup.string().required("Nama lengkap wajib diisi"),
    email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
    password: yup
        .string()
        .required("Password wajib diisi")
        .min(8, "Minimal 8 karakter")
        .matches(/[A-Z]/, "Harus ada huruf besar")
        .matches(/[a-z]/, "Harus ada huruf kecil")
        .matches(/[0-9]/, "Harus ada angka")
        .matches(/[^A-Za-z0-9]/, "Harus ada simbol"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Konfirmasi password tidak sama"),
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