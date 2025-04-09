import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address').max(255, 'Email must be under 255 characters'),
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
