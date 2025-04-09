import { z } from 'zod';

export const signupSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(50, 'Name must not exceed 50 characters'),
    email: z.string().email('Invalid email address').max(255, 'Email must be under 255 characters'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters')
      .max(128, 'Password must be under 128 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
