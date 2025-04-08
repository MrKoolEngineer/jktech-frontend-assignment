'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import AuthLayout from '@components/layouts/AuthLayout';
import InputField from '@components/ui/InputField';
import Button from '@components/ui/Button';
import { forgotPasswordSchema, ForgotPasswordData } from '@schemas/forgot-password.schema';

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordData) => {
    console.log('Forgot Password Request:', data);
  };

  return (
    <AuthLayout title="Forgot Password">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          id="email"
          label="Email"
          type="text"
          error={errors.email?.message}
          {...register('email')}
        />
        <Button type="submit" className="w-full">
          Reset Password
        </Button>
        <p className="text-center text-sm text-gray-600">
          Back to{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
