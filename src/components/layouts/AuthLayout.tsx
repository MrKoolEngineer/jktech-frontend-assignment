'use client';

import React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-md">
        {title && <h1 className="text-center text-2xl font-semibold">{title}</h1>}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
