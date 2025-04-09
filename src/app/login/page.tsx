'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AuthLayout from '@components/layouts/AuthLayout';
import InputField from '@components/ui/InputField';
import Button from '@components/ui/Button';
import Toast from '@components/ui/Toast';
import { useAuth } from '@context/AuthContext';
import { loginSchema, LoginFormData } from '@schemas/login.schema';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        login(result.user); // set user in context
        router.replace('/'); // redirect to home (dashboard)
      } else {
        setToast({ type: 'error', message: result.message });
      }
    } catch (error) {
      console.error('Login error:', error);
      setToast({ type: 'error', message: 'Something went wrong. Please try again later.' });
    }
  };

  return (
    <AuthLayout title="Login">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          id="email"
          label="Email"
          type="text"
          {...register('email')}
          error={errors.email?.message}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-sm">
            <input type="checkbox" {...register('remember')} />
            <span>Remember me</span>
          </label>
          <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full">
          Log In
        </Button>

        <p className="mt-4 text-center text-sm">
          New here?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
