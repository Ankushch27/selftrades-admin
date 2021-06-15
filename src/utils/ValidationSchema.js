import * as yup from 'yup';

export const SignupSchema = yup.object({
  name: yup.string().min(3, '* Name must be at least 3 characters'),
  email: yup.string(),
  mobile: yup.string(),
  otp: yup.string(),
  password: yup
    .string()
    .min(8, '* Password must be at least 8 characters')
    .max(32, '* Password must be at most 32 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], '* Password and Confirm password must match'),
});

export const LoginSchema = yup.object({
  email: yup.string(),
  password: yup.string(),
});

export const PasswordSchema = yup.object({
  password: yup
    .string()
    .required('* Password is a required field')
    .min(8, '* Password must be at least 8 characters')
    .max(32, '* Password must be at most 32 characters'),
  confirmPassword: yup
    .string()
    .required('* Confirm password is a required field')
    .oneOf([yup.ref('password'), null], '* Password and Confirm password must match'),
});

export const CouponSchema = yup.object({
  coupon: yup.string().required(),
  discount: yup.string().required(),
  module: yup.string().oneOf(['Intraday', 'Positional']),
});
