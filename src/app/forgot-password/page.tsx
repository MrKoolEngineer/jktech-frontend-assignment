'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AuthLayout from '@components/layouts/AuthLayout';
import InputField from '@components/ui/InputField';
import Button from '@components/ui/Button';
import Toast from '@components/ui/Toast';
import { forgotPasswordSchema, ForgotPasswordData } from '@schemas/forgot-password.schema';

export default function ForgotPasswordPage() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      const { message } = result;
      if (response.ok) {
        setToast({ type: 'success', message });
      } else {
        setToast({ type: 'error', message });
      }
    } catch (error) {
      console.error('Forgot Password Error:', error);
      setToast({ type: 'error', message: 'Something went wrong. Please try again later.' });
    }
  };

  return (
    <AuthLayout title="Forgot Password">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
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
