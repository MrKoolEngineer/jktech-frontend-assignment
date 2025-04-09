import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address').max(255, 'Email must be under 255 characters'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(128, 'Password must be under 128 characters'),
  remember: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
