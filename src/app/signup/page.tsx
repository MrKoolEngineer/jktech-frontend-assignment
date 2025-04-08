'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AuthLayout from '@components/layouts/AuthLayout';
import InputField from '@components/ui/InputField';
import Button from '@components/ui/Button';
import { signupSchema, SignupFormData } from '@schemas/signup.schema';

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log('Signup Data:', data);
  };

  return (
    <AuthLayout title="Create an Account">
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
          type="email"
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
