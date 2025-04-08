'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AuthLayout from '@components/layouts/AuthLayout';
import InputField from '@components/ui/InputField';
import Button from '@components/ui/Button';
import { loginSchema, LoginFormData } from '@schemas/login.schema';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Login form data:', data);
    // TODO: Replace with actual mock API interaction
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputField
          id="email"
          label="Email"
          type="email"
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
