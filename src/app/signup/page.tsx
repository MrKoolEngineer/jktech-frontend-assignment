'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AuthLayout from '@components/layouts/AuthLayout';
import InputField from '@components/ui/InputField';
import Button from '@components/ui/Button';
import Toast from '@components/ui/Toast';
import { signupSchema, SignupFormData } from '@schemas/signup.schema';

export default function SignupPage() {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await fetch('/api/signup', {
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
      console.error('Signup Error:', error);
      setToast({ type: 'error', message: 'Something went wrong. Please try again later.' });
    }
  };

  return (
    <AuthLayout title="Create an Account">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          id="name"
          label="Name"
          type="text"
          error={errors.name?.message}
          {...register('name')}
        />
        <InputField
          id="email"
          label="Email"
          type="text"
          error={errors.email?.message}
          {...register('email')}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />
        <InputField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
